import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/_auth/forms"
import { z } from "zod"

const SignUp = () => {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: '',
      password: '',
    },
  })

  async function onSubmit(_values: z.infer<typeof SignUpValidation>) {
    try {
      form.reset();
      navigate("/");

    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Form {...form}>
      <h2 className="h3-bold md:h2-bold titleContainer">Sign Up</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="formContainer">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type='email' placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="button_primary">Submit</Button>

        <p className="subtle-regular">
          Already have an account? <Link to="/log-in" className="subtle-semibold ml-1">Log In</Link>
        </p>
      </form>
    </Form>
  )
}

export default SignUp