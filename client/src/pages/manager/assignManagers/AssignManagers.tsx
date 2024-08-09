import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";

const colourStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (styles: any, { isDisabled }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "red" : "#22c55e",
      color: "#FFF",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  // other components styles...
};

const loadOptions = async (inputValue: string) => {
  try {
    const response = await api.get(
      `/fetch-users-by-email-partials/?emailPartial=${inputValue}`
    );
    const data = response.data;

    if (!data || !data.length) {
      return []; // Return empty array if no users found
    }

    // Assuming your backend returns users with an "id" and "email" property
    const users = data.map((user: { id: string; email: string }) => ({
      value: user.id, // Set the option value
      label: user.email, // Set the option label
    }));
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return empty array on error
  }
};

const formSchema = z.object({
  users: z
    .array(
      z.object({
        value: z.union([z.string(), z.number()]), // Allow value to be string or number
        label: z.string(),
      })
    )
    .nonempty(), // Ensure that the array is not empty
});

const AssignManagers = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { users } = data;
    try {
      const response = await api.post(`/event/${eventId}/assign-managers/`, {
        users,
      });
      console.log(response.data);

      const labels = users.map((user) => user.label).join("\n");
      toast({
        title: "Managers have been successfully assigned to the event!",
        description: `${labels}\n\nhave been assigned.`,
      });

      const redirectTo = `/admin/create-tasks/${eventId}`;
      // Redirect after 5 seconds
      setTimeout(() => navigate(redirectTo), 5000);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error assigning managers:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="users"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Users</FormLabel>
                <FormControl>
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    value={field.value || []}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    styles={colourStyles}
                  />
                </FormControl>
                <FormDescription>
                  Select users to assign as managers
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Assign Managers To Event {eventId}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AssignManagers;
