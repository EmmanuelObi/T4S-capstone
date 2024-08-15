"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Protected from "@/components/Protected";
import useProfile from "@/hooks/useProfile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabaseKey: string = process.env.NEXT_PUBLIC_ANON_KEY!;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey
);

const employerFormSchema = z.object({
  first_name: z.string({
    required_error: "Please add your First Name.",
  }),
  last_name: z.string().min(3, {
    message: "Last Name must be at least 8 characters.",
  }),
  email: z.string({ required_error: "Please add your email." }).email(),
  company: z.string().min(4, { message: "Company must be filled" }),
});

const seekerFormSchema = z.object({
  first_name: z.string({
    required_error: "Please add your First Name.",
  }),
  last_name: z.string().min(3, {
    message: "Last Name must be added",
  }),
  email: z.string({ required_error: "Please add your email." }).email(),
  phone: z.string().min(4, { message: "Phone Number must be filled" }),
  job_title: z.string().min(4, { message: "Job title must be filled" }),
  cv: z.string(),
});

const Page = () => {
  const [loading, setloading] = useState<any>(false);
  const [data, setData] = useState<any>({});
  const { getProfileDetails, updateProfileDetails } = useProfile();
  const [file, setFile] = useState<any>();
  const [publicLink, setPublicLink] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: any) => {
    setUploadLoading(true);
    let filePath = `public/${data?.user?.first_name}-${
      data?.user?.last_name
    }/cv/${uuidv4()}`;
    const { data: filedata, error } = await supabase.storage
      .from("cvs")
      .upload(filePath, file);

    if (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your upload.",
      });
      return;
    }

    const result = supabase.storage.from("cvs").getPublicUrl(filePath)
      .data.publicUrl;

    setPublicLink(result);

    setUploadLoading(false);
    toast({
      variant: "default",
      title: "CV uploaded successfully",
    });
  };

  const employerForm = useForm<z.infer<typeof employerFormSchema>>({
    resolver: zodResolver(employerFormSchema),
    defaultValues: {
      email: data?.user?.email ?? "",
      first_name: data?.user?.first_name ?? "",
      last_name: data?.user?.last_name ?? "",
      company: data?.company ?? "",
    },
  });

  const seekerForm = useForm<z.infer<typeof seekerFormSchema>>({
    resolver: zodResolver(seekerFormSchema),
    defaultValues: {
      email: data?.user?.email ?? "",
      first_name: data?.user?.first_name ?? "",
      last_name: data?.user?.last_name ?? "",
      phone: data?.phone ?? "",
      job_title: data?.job_title ?? "",
      cv: data?.cv ?? "",
    },
  });

  async function onSubmitEmployer(values: z.infer<typeof employerFormSchema>) {
    setloading(true);
    const params = {
      company: values.company,
    };
    const res = await updateProfileDetails(params);

    if (res) {
      toast({
        variant: "default",
        title: "Profile Updated Successfully",
      });
      setloading(false);
      window.location.reload();
    }
  }

  async function onSubmitSeeker(values: z.infer<typeof seekerFormSchema>) {
    setloading(true);
    const params = {
      phone: values.phone,
      job_title: values.job_title,
      cv: publicLink,
    };
    const res = await updateProfileDetails(params);
    if (res) {
      setPublicLink(res.cv);

      toast({
        variant: "default",
        title: "Profile Updated Successfully",
      });
      setloading(false);
      window.location.reload();
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfileDetails();
      setData(profileData);
      employerForm.reset({
        email: profileData?.user?.email ?? "",
        first_name: profileData?.user?.first_name ?? "",
        last_name: profileData?.user?.last_name ?? "",
        company: profileData?.company === null ? "" : profileData?.company,
      });
      seekerForm.reset({
        email: profileData?.user?.email ?? "",
        first_name: profileData?.user?.first_name ?? "",
        last_name: profileData?.user?.last_name ?? "",
        phone: profileData?.phone ?? "",
        job_title: profileData?.job_title ?? "",
        cv: profileData?.cv ?? "",
      });

      setPublicLink(profileData?.cv);
    };

    fetchProfile();
  }, []);
  return (
    <Protected>
      <div className="flex min-h-screen w-full flex-col">
        <Header userRole={data?.user?.role} />

        {JSON.stringify(data) === "{}" ? (
          <div className="w-full max-w-5xl py-10 mx-auto flex flex-col items-center justify-center space-y-4">
            <div className="w-full flex items-start space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[130px]" />
              </div>
            </div>
            <div className="w-full flex items-start space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[130px]" />
              </div>
            </div>
            <div className="w-full flex items-start space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[130px]" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {data?.user?.role === "employer" && (
              <Form {...employerForm}>
                <form
                  onSubmit={employerForm.handleSubmit(onSubmitEmployer)}
                  className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"
                >
                  <div className="px-4 space-y-6 md:px-6">
                    <header className="space-y-1.5">
                      <div className="flex items-center space-x-4">
                        <div className="space-y-1.5">
                          <h1 className="text-2xl font-bold capitalize">
                            {data?.user?.first_name +
                              " " +
                              data?.user?.last_name}
                          </h1>
                          <p className="text-gray-500 dark:text-gray-400">
                            {data?.company ?? "Complete your profile"}
                          </p>
                        </div>
                      </div>
                    </header>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={employerForm.control}
                              name="first_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your first name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={employerForm.control}
                              name="last_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your last name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={employerForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="m@example.com"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={employerForm.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your company name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button size="lg" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            )}

            {data?.user?.role !== "employer" && (
              <Form {...seekerForm}>
                <form
                  onSubmit={seekerForm.handleSubmit(onSubmitSeeker)}
                  className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"
                >
                  <div className="px-4 space-y-6 md:px-6">
                    <header className="space-y-1.5">
                      <div className="flex items-center space-x-4">
                        <div className="space-y-1.5">
                          <h1 className="text-2xl font-bold capitalize">
                            {" "}
                            {data?.user?.first_name +
                              " " +
                              data?.user?.last_name}
                          </h1>
                          <p className="text-gray-500 dark:text-gray-400">
                            {data?.job_title === ""
                              ? "Complete your profile"
                              : data?.job_title}
                          </p>
                        </div>
                      </div>
                    </header>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={seekerForm.control}
                              name="first_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your first name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={seekerForm.control}
                              name="last_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your last name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={seekerForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="m@example.com"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={seekerForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Update here.."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <FormField
                              control={seekerForm.control}
                              name="job_title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Update here.."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Card className="w-full max-w-md">
                          <CardHeader>
                            <CardDescription>
                              Submit your resume for consideration. Accepted
                              file types are PDF, DOC, and DOCX.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <FormField
                                control={seekerForm.control}
                                name="cv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Choose File</FormLabel>
                                    <FormControl>
                                      <Input
                                        id="cv-upload"
                                        type="file"
                                        onChange={(e) =>
                                          setFile(
                                            e?.target?.files?.length
                                              ? e.target?.files[0]
                                              : ""
                                          )
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Button
                              type="button"
                              onClick={() => uploadFile(file)}
                            >
                              {uploadLoading ? "Uploading..." : "Upload CV"}
                            </Button>
                            {publicLink !== "" && (
                              <a
                                href={publicLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-blue-400 text-sm underline"
                              >
                                View Uploaded CV
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button size="lg" type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </>
        )}
      </div>
    </Protected>
  );
};

export default Page;
