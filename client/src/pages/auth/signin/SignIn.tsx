import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "@/services/auth/auth.service";
import { Button } from "@/components/ui/button";
import { UserContext, UserContextType } from "@/contexts/UserContext";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SuccessAlert } from "@/components/common/alerts/SuccessAlert";
// import styles from './css/signup.module.css'

const validationSchema = z.object({
  username: z.string().min(2, "Too Short!").max(50, "Too Long!"),
  password: z
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .regex(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*()_\-+=|\\<,>,?]{8,})$/,
      "Password must be alphanumeric and should contain special characters."
    ),
});

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [successAlert, setSuccessAlert] = useState("");
  const { setCurrentUser } = useContext(UserContext) as UserContextType;

  function onSubmit(values: z.infer<typeof validationSchema>) {
    authService
      .signIn(values.username, values.password)
      .then((user) => {
        // Update currentUser
        setCurrentUser(user);
        // Show success message
        setSuccessAlert("Sign in successful!");
        // Redirect based on role
        const role = user.roles.reverse()[0]; // assuming roles are sorted in ascending order of authority
        // Redirect to /signin or original location after 2 seconds
        const redirectTo =
          location.state?.from ||
          `/${role.toLowerCase().substring(5)}/${user.username}`;
        // Redirect after 2 seconds
        setTimeout(() => navigate(redirectTo), 2000);
      })
      .catch((err) => {
        // Show error message
        alert(err.message);
      });
  }

  // Define your form.
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 md:w-1/2 lg:w-2/5">
        <h1 className="text-3xl font-bold mb-4 text-primary dark:text-primary">
          Sign In
        </h1>
        <SuccessAlert message={successAlert} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* FormField for 'name' */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your username here" {...field} />
                  </FormControl>
                  <FormDescription>Your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* FormField for 'name' */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password goes here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="h-6 mt-2 mb-2 bg">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
