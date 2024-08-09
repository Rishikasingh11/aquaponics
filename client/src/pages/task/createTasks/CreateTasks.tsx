import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import api from "@/services/api";
import { Textarea } from "@/components/ui/textarea";
import { FaPlus, FaTrash } from "react-icons/fa6";

const formSchema = z.object({
  tasks: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().optional(),
      })
    )
    .nonempty({ message: "At least one task is required" }),
});

export function CreateTasks() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: [{ title: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post(`/event/${eventId}/create-tasks`, {
        tasks: data.tasks,
      });
      console.log(response.data);
      const taskTitles = data.tasks.map((task) => task.title).join("\n");
      toast({
        title: "Tasks have been successfully created!",
        description: `${taskTitles}\n\nhave been added.`,
      });
      const redirectTo = `/admin/event/${eventId}/tasks`;
      setTimeout(() => navigate(redirectTo), 5000);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error creating tasks:",
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
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`tasks.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the subject of the task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`tasks.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Task description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Explain the task in details
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center space-x-4">
                <Button
                  type="button"
                  onClick={() => append({ title: "", description: "" })}
                  className="flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add Task</span>
                </Button>
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center space-x-2"
                >
                  <FaTrash />
                  <span>Remove Task</span>
                </Button>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default CreateTasks;
