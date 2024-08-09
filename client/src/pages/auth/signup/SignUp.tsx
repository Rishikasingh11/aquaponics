import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/services/auth/auth.service";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessAlert } from "@/components/common/alerts/SuccessAlert";
// import styles from './css/signup.module.css'

const validationSchema = z.object({
  username: z.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: z.string().email("Invalid email").min(1),
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
  const [successAlert, setSuccessAlert] = useState("");

  function onSubmit(values: z.infer<typeof validationSchema>) {
    authService
      .signUp(values.username, values.email, values.password)
      .then((user) => {
        // Show success message
        setSuccessAlert(
          `User ${user.username} was registered successfully!`
        );
        // Redirect to /signin after 3 seconds
        setTimeout(() => navigate("/signin"), 3000);
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
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 md:w-1/2 lg:w-2/5">
        {/* <span className={`${styles['hello-world']} ${styles['underline']}`}>Hello World!</span> */}
        <h1 className="text-3xl font-bold mb-4 text-primary dark:text-primary">
          Sign Up
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
                    <Input
                      type="text"
                      placeholder="enter your username here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FormField for 'email' */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="enter your email address here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your Email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FormField for 'password' */}
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
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="h-6 mt-2 mb-2 bg">
          Already a user?{" "}
          <Link to="/signin" className="text-primary">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
