"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useJobs from "@/hooks/useJobs";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Please add a job title.",
  }),
  salary: z.string().min(4, {
    message: "Please add a salary range",
  }),
  description: z.string().min(4, {
    message: "Please add the job description",
  }),
  requirements: z.string().min(4, {
    message: "Please add the job requirements",
  }),
  location: z.string().min(4, {
    message: "Please add the job location",
  }),
});

const EditJobModal = ({ data, isOpen, setIsOpen, handleClose }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { updateJob } = useJobs();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      salary: "",
      description: "",
      requirements: "",
      location: "",
    },
  });

  const { handleSubmit, setValue, control } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await updateJob(
        {
          ...values,
          company: data?.company,
        },
        data?.id
      ).then((res) => {
        console.log({ res });
        toast({
          variant: "default",
          title: "Successfully Edited job",
        });
        handleClose();
        window.location.reload();
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data) {
      // Update default values
      setValue("title", data.title);
      setValue("salary", data.salary);
      setValue("description", data.description);
      setValue("requirements", data.requirements);
      setValue("location", data.location);
    }
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Job Post</DialogTitle>
          <DialogDescription>
            Complete the form to edit this job posting.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="space-y-2">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter salary range" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the job" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Fill in the requirements"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Add a location" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {loading ? "Loading..." : "Complete Edit"}
              </Button>
              <div>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
