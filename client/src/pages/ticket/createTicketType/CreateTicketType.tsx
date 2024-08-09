import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext, UserContextType } from "@/contexts/UserContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ticketService from "@/services/ticket/ticket.service";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  price: z.coerce.number().min(0),
  type: z.string(),
  couponCode: z.string(),
});

const CreateTicketType = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext) as UserContextType;
  const userId = Number(currentUser?.id);
  const [selectedType, setSelectedType] = useState("");

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      type: "original",
      couponCode: "",
    },
  });

  // Define submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const ticketTypeData = {
      ...values,
      eventId: Number(eventId),
      status: "available", // default value is 'available'
      userId: userId,
    };
    console.log(ticketTypeData);
    ticketService
      .createTicket(ticketTypeData)
      .then((data) => {
        console.log("TicketType created successfully:", data);
        toast({
          title: "Ticket Type created successfully",
          description: `${data.ticket.type} ticket type has been created successfully! Price: ${data.ticket.price}`,
        });
        const redirectTo = `/admin/assign-managers/${data.ticket.eventId}`;
        // Redirect after 5 seconds /admin/create-ticket/:eventId
        setTimeout(() => navigate(redirectTo), 5000);
      })
      .catch((error) => {
        console.error("There was an error creating the Ticket Type:", error);
      });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* FormField for type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedType(value); // Update the selected type
                    if (value === "free") {
                      form.setValue("price", 0); // Set the price to 0 in the form's internal state
                    }
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of ticket you want to create..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="original">Original</SelectItem>
                    <SelectItem value="discounted">Discounted</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of event you want to host
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* FormField for price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price of the ticket</FormLabel>
                <FormControl>
                  <div className="flex justify-start items-center">
                    <Button
                      type="button"
                      className="mr-5"
                      disabled={selectedType === "free"} // Disable the button if the selected type is 'free'
                      onClick={() => {
                        if (Number(field.value) > 0) {
                          field.onChange(Number(field.value) - 1);
                        }
                      }}
                    >
                      <FaCircleMinus className="h-8 w-8 text-neutral-50" />
                    </Button>
                    <Input
                      className="w-full lg:w-1/2 md:w-3/4"
                      placeholder="10"
                      disabled={selectedType === "free"} // Disable the input if the selected type is 'free'
                      {...field}
                      value={selectedType === "free" ? 0 : field.value} // Set the value to 0 if the selected type is 'free'
                    />
                    <Button
                      type="button"
                      className="ml-5"
                      disabled={selectedType === "free"} // Disable the button if the selected type is 'free'
                      onClick={() => {
                        field.onChange(Number(field.value) + 1);
                      }}
                    >
                      <FaCirclePlus className="h-8 w-8 text-neutral-50" />
                    </Button>
                  </div>
                </FormControl>

                <FormDescription>
                  Set the price of the ticket type
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* FormField for couponCode */}
          <FormField
            control={form.control}
            name="couponCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Coupon Code"
                    disabled={selectedType === "original"}
                    {...field}
                    value={selectedType === "original" ? "" : field.value}
                  />
                </FormControl>
                <FormDescription>
                  Create a coupon for your customers to use
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create Ticket Type
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateTicketType;
