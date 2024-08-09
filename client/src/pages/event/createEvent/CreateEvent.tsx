import {
  ChangeEvent,
  Suspense,
  useContext,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { UserContext, UserContextType } from "@/contexts/UserContext";
import {
  FaCalendar,
  FaCirclePlus,
  FaCircleMinus,
  FaLocationDot,
} from "react-icons/fa6";

import { format } from "date-fns";
import { debounce } from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { useFetchLocation } from "@/hooks/locationHooks";
import api from "@/services/api";
import eventService from "@/services/event/event.service";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  thumbnail: z.instanceof(File),
  startingDate: z.date(),
  endingDate: z.date(),
  type: z.string(),
  location: z.string(),
  slug: z.string(),
  maxAttendees: z.coerce.number().int().min(2),
  userId: z.number(),
});

const CreateEvent = () => {
  const { currentUser } = useContext(UserContext) as UserContextType;
  const userId = Number(currentUser?.id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fetchLocation, error } = useFetchLocation();
  const [slugAvailable, setSlugAvailable] = useState<boolean>(true);
  const [isInteracted, setIsInteracted] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const startingDate = new Date();

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startingDate: new Date(),
      endingDate: new Date(),
      type: "",
      location: "",
      slug: "",
      maxAttendees: 0,
      userId: userId,
    },
  });

  // Define submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Dynamically append fields to formData
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "number") {
        formData.append(key, value.toString()); // Convert numbers to strings
      } else {
        formData.append(key, value); // For strings
      }
    });

    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // Call `createEvent` with the form values.
    eventService
      .createEvent(formData)
      .then((data) => {
        console.log("Event created successfully:", data);
        toast({
          title: "Event created successfully",
          description: `${data.event.name}. Type: ${data.event.type}`,
        });
        const redirectTo = `/admin/create-ticket/${data.event.id}`;
        // Redirect after 5 seconds /admin/create-ticket/:eventId
        setTimeout(() => navigate(redirectTo), 5000);
      })
      .catch((error) => {
        console.error("There was an error creating the event:", error);
      });
  }

  const checkSlug = debounce(async (slug: string) => {
    startTransition(() => {
      setSlugAvailable(false);
      api
        .post("/check-event-slug-availability", { slug })
        .then((response) => {
          setSlugAvailable(response.data.available);
        })
        .catch((error) => {
          console.error("An error occurred while checking the slug:", error);
        });
    });
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsInteracted(true); // Set interaction to true on change
    checkSlug(value);
  };

  return (
    <Form {...form}>
      <form
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* FormField for 'name' */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Event Name" {...field} />
              </FormControl>
              <FormDescription>This is the name of the event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FormField for 'description' */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain the event to us in a few words"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe the event in a few words.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* FormField for 'thumbnail' */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...{ ...field, value: undefined }} // Ensure that the value prop is not passed to the file input
                  onChange={(event) => {
                    // Update the form state with the selected file
                    const file = event.target.files
                      ? event.target.files[0]
                      : null;
                    field.onChange(file); // Use field.onChange to update react-hook-form state
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the thumbnail for the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Columns for date picking */}
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row space-y-10 lg:space-y-0">
          <div className="w-full md:w-1/2 lg:w-1/2">
            {/* Content for first column */}
            {/* FormField for 'startingDate' */}
            <FormField
              control={form.control}
              name="startingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date on which the event starts</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <FaCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < startingDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This will set the date on which the event is supposed to
                    start.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2">
            {/* Content for second column */}
            {/* FormField for 'endingDate' */}
            <FormField
              control={form.control}
              name="endingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date on which the event ends</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <FaCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < form.getValues("startingDate")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This will set the date on which the event is supposed to
                    end.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* FormField for 'type' */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of event you want to create..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="onlinemeeting">Online Meeting</SelectItem>
                  <SelectItem value="concert">Concert</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the type of event you want to host
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FormField for 'location' */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="flex flex-col sm:flex-row w-full items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="Location"
                    {...field}
                    className="w-full lg:w-3/4"
                  />
                  <Suspense
                    fallback={
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full lg:w-1/4"
                      >
                        <FaLocationDot className="mr-2" />
                        Fetching Your Location
                      </Button>
                    }
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full lg:w-1/4"
                      onClick={() => {
                        startTransition(() => {
                          const locationData = fetchLocation();
                          if (locationData) {
                            form.setValue(
                              "location",
                              locationData.display_name
                            );
                          } else if (error) {
                            console.log(
                              "An error occurred while fetching the location"
                            );
                          }
                        });
                      }}
                    >
                      <FaLocationDot className="mr-2" />
                      Use Your Current Location
                    </Button>
                  </Suspense>
                </div>
              </FormControl>
              <FormDescription>
                Put the address where you want to host your event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FormField for 'slug' */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="Slug"
                  {...field}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event); // Call the original onChange handler
                    handleChange(event); // Then call your handleChange function
                  }}
                />
              </FormControl>
              <FormDescription>Put a unique slug</FormDescription>
              {isPending ? (
                <FormMessage>Checking...</FormMessage>
              ) : isInteracted ? ( // Only show the message if the field has been interacted with
                slugAvailable ? (
                  <FormMessage className="text-green-800 dark:text-green-400">
                    Slug is available
                  </FormMessage>
                ) : (
                  <FormMessage>Slug is not available</FormMessage>
                )
              ) : null}
            </FormItem>
          )}
        />

        {/* FormField for 'maxAttendees' */}
        <FormField
          control={form.control}
          name="maxAttendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Number Of Attendees</FormLabel>
              <FormControl>
                <div className="flex justify-start items-center">
                  <Button
                    className="mr-5"
                    onClick={() => {
                      if (Number(field.value) > 0) {
                        field.onChange(Number(field.value) - 1);
                      }
                    }}
                  >
                    <FaCircleMinus className="h-8 w-8 text-neutral-50" />
                  </Button>
                  <Input
                    type="number"
                    className="w-full lg:w-1/2 md:w-3/4"
                    placeholder="10"
                    {...field}
                  />
                  <Button
                    className="ml-5"
                    onClick={() => {
                      field.onChange(Number(field.value) + 1);
                    }}
                  >
                    <FaCirclePlus className="h-8 w-8 text-neutral-50" />
                  </Button>
                </div>
              </FormControl>

              <FormDescription>
                Set the maximum number of attendees that this event can
                accommodate
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </Form>
  );
};

export default CreateEvent;
