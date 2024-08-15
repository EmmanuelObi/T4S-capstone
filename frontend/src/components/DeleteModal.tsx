"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useJobs from "@/hooks/useJobs";
import { useToast } from "@/components/ui/use-toast";

const DeleteModal = ({ id, isOpen, setIsOpen, handleClose }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { deleteJob } = useJobs();
  const completeDelete = async () => {
    setLoading(true);
    try {
      await deleteJob(id).then((res) => {
        console.log({ res });
        toast({
          variant: "default",
          title: "Successfully deleted job",
        });
        handleClose();
        window.location.reload();
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this job
            and it&apos;s your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={completeDelete}>
            {loading ? "Loading..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
