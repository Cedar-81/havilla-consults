import { toast } from "@zerodevx/svelte-toast";

/**
 * @param {{ name: string; subject: string; body: string; }} emailContent
 */
export function validateEmailContent(emailContent) {
    const errors = [];
  
    // Validate name
    if (!emailContent.name.trim()) {
      errors.push("Name is required");
    }
  
    // Validate subject
    if (!emailContent.subject.trim()) {
      errors.push("Subject is required");
    }
  
    // Validate body
    if (!emailContent.body.trim()) {
      errors.push("Message is required");
    }
  
    return errors;
  }

  /**
 * @param {{ name: string; email: string; title: string; paymentCode: string; startTime: string; endTime: string; }} formData
 */
  export function validateFormData(formData) {
    const errors = {};
  
    // Check if required fields are empty
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
  
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    }
  
    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
  
    if (!formData.paymentCode.trim()) {
      errors.paymentCode = "Payment code is required.";
    }
  
    if (!formData.startTime.trim()) {
      errors.startTime = "Start time is required.";
    }
  
    if (!formData.endTime.trim()) {
      errors.endTime = "End time is required.";
    }
  
    // You can add additional validation for the format of startTime and endTime if needed
    if (Object.keys(errors).length > 0) {
        // Handle errors (e.g., push to toast array)
        for (const key in errors) {
          // @ts-ignore
          toast.push(errors[key]);
        }
      }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }