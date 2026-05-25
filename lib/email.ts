import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSubmissionConfirmation(
  submitterName: string,
  submitterEmail: string,
  modelName: string
) {
  try {
    await resend.emails.send({
      from: 'AI Registry <noreply@airegistry.dev>',
      to: submitterEmail,
      subject: `Submission Received: ${modelName}`,
      html: `
        <h2>Thank you for your submission!</h2>
        <p>Hi ${submitterName},</p>
        <p>We've received your submission for <strong>${modelName}</strong>.</p>
        <p>Our team will review your submission and get back to you shortly.</p>
        <p>Best regards,<br/>The AI Registry Team</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send submission confirmation:', error)
  }
}

export async function sendApprovalNotification(
  submitterName: string,
  submitterEmail: string,
  modelName: string
) {
  try {
    await resend.emails.send({
      from: 'AI Registry <noreply@airegistry.dev>',
      to: submitterEmail,
      subject: `Your Model Was Approved: ${modelName}`,
      html: `
        <h2>Congratulations! Your model has been approved.</h2>
        <p>Hi ${submitterName},</p>
        <p>Great news! Your AI model <strong>${modelName}</strong> has been approved and is now live in the AI Registry.</p>
        <p>You can view it here: https://airegistry.dev</p>
        <p>Thank you for contributing to the registry!</p>
        <p>Best regards,<br/>The AI Registry Team</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send approval notification:', error)
  }
}

export async function sendRejectionNotification(
  submitterName: string,
  submitterEmail: string,
  modelName: string,
  reason: string
) {
  try {
    await resend.emails.send({
      from: 'AI Registry <noreply@airegistry.dev>',
      to: submitterEmail,
      subject: `Submission Review: ${modelName}`,
      html: `
        <h2>Submission Review Update</h2>
        <p>Hi ${submitterName},</p>
        <p>Thank you for submitting <strong>${modelName}</strong> to the AI Registry.</p>
        <p>Unfortunately, we were unable to approve this submission at this time.</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>Feel free to resubmit with updates if you'd like.</p>
        <p>Best regards,<br/>The AI Registry Team</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send rejection notification:', error)
  }
}
