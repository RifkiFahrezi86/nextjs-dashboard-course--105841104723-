'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

// ✅ Schema yang benar (tanpa id)
const FormSchema = z.object({
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return 'Invalid credentials.';
      }
      return 'Something went wrong.';
    }
    throw error;
  }
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// ✅ Schema untuk update (tanpa date)
const UpdateInvoice = FormSchema;

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId},
        amount = ${amountInCents},
        status = ${status}
    WHERE id = ${id}
  `;
}

export async function deleteInvoice(id: string) {
  await sql`
    DELETE FROM invoices
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
