
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Header } from '@/components/Header';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock authentication - in a real app, this would make an API call
    if (values.email && values.password) {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
      
      if (hasCompletedOnboarding) {
        navigate('/business-center');
      } else {
        navigate('/onboarding');
      }
    }

    toast({
      title: "Login successful",
      description: `Welcome back, ${values.email}!`,
    })
  }

  const handleRestartOnboarding = () => {
    // Clear onboarding completion flag
    localStorage.removeItem('onboarding_completed');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-center items-center h-full">
          <Card className="w-[400px] bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Login</CardTitle>
              <CardDescription className="text-gray-400 text-center">Enter your email and password to log in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Please enter a valid email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Password must be at least 8 characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-blue-500 text-white">
                    Login
                  </Button>
                </form>
              </Form>
              
              <div className="pt-4 border-t border-gray-600">
                <Button 
                  variant="outline" 
                  onClick={handleRestartOnboarding}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Go Through Onboarding Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Login;
