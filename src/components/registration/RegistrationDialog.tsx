"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleCheckBig, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  PersonalStep,
  ParticipationStep,
  TeammatesStep,
  ReviewStep,
} from "@/components/registration/RegistrationSteps";
import {
  registrationSchema,
  stepFields,
  type RegistrationFormValues,
} from "@/lib/validation";
import {
  DEMO_MODE_NOTICE,
  registrationService,
  type EmailStatus,
} from "@/lib/registrationService";
import { useRegistrationStore } from "@/lib/registration-store";
import type { RegistrationData } from "@/types/event";
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["Personal", "Participation", "Team", "Review"];

export function RegistrationDialog() {
  const { isOpen, presetTrackId, openId, close } = useRegistrationStore();
  const { toast } = useToast();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [submitted, setSubmitted] = useState<{
    reference: string;
    emailStatus: EmailStatus;
    emailPreviewUrl?: string;
  } | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      college: "",
      academicYear: undefined,
      portfolioUrl: "",
      mode: "Individual",
      teamName: "",
      teamSize: 1,
      trackId: "",
      idea: "",
      teammates: [],
      agreedToRules: false,
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    trigger,
    setError,
    formState: { isSubmitting },
  } = form;

  /* Apply a track preset when opened from a track card. An explicit
      "Register for this track" action always overrides leftover data. */
  useEffect(() => {
    if (isOpen && presetTrackId) {
      form.setValue("trackId", presetTrackId, { shouldDirty: false });
    }
  }, [isOpen, openId, presetTrackId]);

  /* Move focus to the step heading after step changes (a11y). */
  useEffect(() => {
    if (isOpen && !submitted) {
      stepHeadingRef.current?.focus();
    }
  }, [step, isOpen, submitted]);

  const isTeam = useWatch({ control: form.control, name: "mode" }) === "Team";

  const goToStep = (next: 0 | 1 | 2 | 3) => setStep(next);

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (!valid) return;
    if (step === 1 && !isTeam) {
      setStep(3); // individuals skip the teammates step
      return;
    }
    setStep((s) => Math.min(3, s + 1) as 0 | 1 | 2 | 3);
  };

  const backStep = () => {
    if (step === 3 && !isTeam) {
      setStep(1); // individuals skip back over the teammates step
      return;
    }
    setStep((s) => Math.max(0, s - 1) as 0 | 1 | 2 | 3);
  };

  const onSubmit = async (values: RegistrationFormValues) => {
    const data: RegistrationData = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone ?? "",
      college: values.college,
      academicYear: values.academicYear,
      portfolioUrl: values.portfolioUrl ?? "",
      mode: values.mode,
      teamName: values.teamName ?? "",
      teamSize: values.teamSize,
      trackId: values.trackId,
      idea: values.idea ?? "",
      teammates: values.teammates,
      agreedToRules: values.agreedToRules,
    };

    const result = await registrationService.submit(data);

    if (result.ok) {
      setSubmitted({
        reference: result.reference,
        emailStatus: result.emailStatus,
        emailPreviewUrl: result.emailPreviewUrl,
      });
      return;
    }

    if (result.error === "duplicate") {
      setError("email", { message: result.message });
      setStep(0);
      toast({
        title: "Already registered",
        description: result.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Submission failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    close();
    if (submitted) {
      /* Clear sensitive form data after a successful registration. */
      setSubmitted(null);
      setStep(0);
      form.reset();
    }
  };

  const stepDescription =
    step === 0
      ? "Tell us who you are — this is how we reach you."
      : step === 1
        ? "Pick your participation mode, team details and track."
        : step === 2
          ? "Add your teammates — each with their own email."
          : "Check everything, accept the rules, and submit.";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent
        className="flex max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-2xl flex-col gap-0 overflow-hidden border-border bg-background p-0 sm:w-full sm:rounded-2xl"
      >
        {submitted ? (
          <RegistrationSuccess
            reference={submitted.reference}
            emailStatus={submitted.emailStatus}
            emailPreviewUrl={submitted.emailPreviewUrl}
            values={form.getValues()}
            onDone={handleDialogClose}
          />
        ) : (
          <Form {...form}>
            <form
              onSubmit={(e) => {
                /* Enter key advances the wizard; only the final step submits. */
                e.preventDefault();
                if (step < 3) {
                  void nextStep();
                } else {
                  void handleSubmit(onSubmit)(e);
                }
              }}
              noValidate
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* Header */}
              <DialogHeader className="border-b border-border px-6 pb-5 pt-6 sm:px-8">
                <DialogTitle className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                  Register for DEVSPRINT 36
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">
                  {stepDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Progress stepper */}
              <div className="border-b border-border bg-surface/60 px-6 py-4 sm:px-8">
                <ol
                  className="flex items-center gap-2 sm:gap-3"
                  aria-label="Registration progress"
                >
                  {STEP_LABELS.map((label, i) => {
                    const skipped = i === 2 && !isTeam;
                    const state =
                      i === step
                        ? "current"
                        : i < step
                          ? "done"
                          : skipped
                            ? "skipped"
                            : "upcoming";
                    return (
                      <li
                        key={label}
                        aria-current={state === "current" ? "step" : undefined}
                        className="flex flex-1 items-center gap-2"
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] font-bold",
                            state === "current" &&
                              "border-acid bg-acid text-acid-foreground",
                            state === "done" &&
                              "border-acid/60 bg-acid/15 text-acid",
                            (state === "upcoming" || state === "skipped") &&
                              "border-border bg-surface text-muted-foreground/60"
                          )}
                        >
                          {state === "done" ? (
                            <Check aria-hidden="true" className="h-3.5 w-3.5" />
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span
                          className={cn(
                            "hidden text-xs font-semibold sm:block",
                            state === "current"
                              ? "text-foreground"
                              : state === "skipped"
                                ? "text-muted-foreground/50 line-through"
                                : "text-muted-foreground"
                          )}
                        >
                          {label}
                        </span>
                        {i < STEP_LABELS.length - 1 && (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-px flex-1",
                              i < step ? "bg-acid/50" : "bg-border"
                            )}
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Scrollable body */}
              <div className="scroll-slim min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                <h3 ref={stepHeadingRef} tabIndex={-1} className="sr-only">
                  {`Step ${step + 1} of 4: ${STEP_LABELS[step]}`}
                </h3>

                {step === 0 && <PersonalStep form={form} />}
                {step === 1 && <ParticipationStep form={form} />}
                {step === 2 && <TeammatesStep form={form} />}
                {step === 3 && <ReviewStep form={form} goToStep={goToStep} />}

                {/* Demo-mode notice */}
                <p className="mt-6 flex items-start gap-2.5 rounded-lg border border-border bg-surface/70 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <Info
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-aqua"
                  />
                  {DEMO_MODE_NOTICE}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 border-t border-border bg-surface/40 px-6 py-4 sm:px-8">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={backStep}
                  disabled={step === 0 || isSubmitting}
                >
                  Back
                </Button>
                <div className="flex items-center gap-3">
                  <span className="mono-label hidden text-[0.5625rem] text-muted-foreground sm:block">
                    step {step + 1}/{STEP_LABELS.length}
                  </span>
                  {step < 3 ? (
                    <Button type="button" onClick={() => void nextStep()}>
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin motion-reduce:animate-none"
                          />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <CircleCheckBig
                            aria-hidden="true"
                            className="h-4.5 w-4.5"
                          />
                          Submit Registration
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
