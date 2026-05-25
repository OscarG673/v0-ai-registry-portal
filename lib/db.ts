import { neon } from '@neondatabase/serverless'

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(process.env.DATABASE_URL)
}

export interface AIModel {
  id: number
  name: string
  description: string | null
  category: string | null
  license_type: string | null
  source_url: string | null
  documentation_url: string | null
  capabilities: string[] | null
  performance_metrics: Record<string, any> | null
  tags: string[] | null
  created_at: Date
  updated_at: Date
}

export interface ModelSubmission {
  id: number
  submitter_email: string
  submitter_name: string
  model_name: string
  model_description: string | null
  category: string | null
  license_type: string | null
  source_url: string | null
  documentation_url: string | null
  capabilities: string[] | null
  additional_info: Record<string, any> | null
  status: 'pending' | 'approved' | 'rejected'
  submitted_at: Date
  reviewed_at: Date | null
  reviewed_by_id: number | null
  rejection_reason: string | null
  approved_model_id: number | null
}

// AI Models queries
export async function getAllModels(
  category?: string,
  limit: number = 50,
  offset: number = 0
): Promise<AIModel[]> {
  const sql = getSql()
  if (category) {
    const result = await sql`
      SELECT * FROM ai_models WHERE category = ${category} 
      LIMIT ${limit} OFFSET ${offset}
    `
    return result as AIModel[]
  } else {
    const result = await sql`
      SELECT * FROM ai_models ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `
    return result as AIModel[]
  }
}

export async function getModelById(id: number): Promise<AIModel | null> {
  const sql = getSql()
  const result = await sql`SELECT * FROM ai_models WHERE id = ${id}`
  return result.length > 0 ? (result[0] as AIModel) : null
}

export async function searchModels(searchTerm: string): Promise<AIModel[]> {
  const sql = getSql()
  const searchPattern = `%${searchTerm}%`
  const result = await sql`
    SELECT * FROM ai_models 
    WHERE name ILIKE ${searchPattern}
    OR description ILIKE ${searchPattern}
    ORDER BY created_at DESC
    LIMIT 50
  `
  return result as AIModel[]
}

export async function getModelsByTag(tag: string): Promise<AIModel[]> {
  const sql = getSql()
  const result = await sql`
    SELECT * FROM ai_models 
    WHERE tags @> ARRAY[${tag}]
    ORDER BY created_at DESC
  `
  return result as AIModel[]
}

export async function createModel(modelData: Partial<AIModel>): Promise<AIModel> {
  const sql = getSql()
  const capabilities = modelData.capabilities || []
  const tags = modelData.tags || []
  const performanceMetrics = modelData.performance_metrics || {}
  
  const result = await sql`
    INSERT INTO ai_models (
      name, description, category, license_type, 
      source_url, documentation_url, capabilities, 
      performance_metrics, tags
    ) VALUES (
      ${modelData.name}, ${modelData.description || null}, 
      ${modelData.category || null}, ${modelData.license_type || null},
      ${modelData.source_url || null}, ${modelData.documentation_url || null},
      ${capabilities},
      ${JSON.stringify(performanceMetrics)},
      ${tags}
    )
    RETURNING *
  `
  return result[0] as AIModel
}

// Model Submissions queries
export async function getPendingSubmissions(
  limit: number = 50,
  offset: number = 0
): Promise<ModelSubmission[]> {
  const sql = getSql()
  const result = await sql`
    SELECT * FROM model_submissions 
    WHERE status = 'pending'
    ORDER BY submitted_at ASC
    LIMIT ${limit} OFFSET ${offset}
  `
  return result as ModelSubmission[]
}

export async function getSubmissionById(id: number): Promise<ModelSubmission | null> {
  const sql = getSql()
  const result = await sql`SELECT * FROM model_submissions WHERE id = ${id}`
  return result.length > 0 ? (result[0] as ModelSubmission) : null
}

export async function createSubmission(
  submissionData: Partial<ModelSubmission>
): Promise<ModelSubmission> {
  const sql = getSql()
  const capabilities = submissionData.capabilities || []
  const additionalInfo = submissionData.additional_info || {}
  
  const result = await sql`
    INSERT INTO model_submissions (
      submitter_email, submitter_name, model_name, model_description,
      category, license_type, source_url, documentation_url,
      capabilities, additional_info, status
    ) VALUES (
      ${submissionData.submitter_email}, ${submissionData.submitter_name},
      ${submissionData.model_name}, ${submissionData.model_description || null},
      ${submissionData.category || null}, ${submissionData.license_type || null},
      ${submissionData.source_url || null}, ${submissionData.documentation_url || null},
      ${capabilities},
      ${JSON.stringify(additionalInfo)},
      'pending'
    )
    RETURNING *
  `
  return result[0] as ModelSubmission
}

export async function approveSubmission(
  submissionId: number,
  adminId: number
): Promise<{ submission: ModelSubmission; model: AIModel }> {
  const sql = getSql()
  const submission = await getSubmissionById(submissionId)
  if (!submission) {
    throw new Error('Submission not found')
  }

  // Create the model
  const model = await createModel({
    name: submission.model_name,
    description: submission.model_description,
    category: submission.category,
    license_type: submission.license_type,
    source_url: submission.source_url,
    documentation_url: submission.documentation_url,
    capabilities: submission.capabilities,
    tags: submission.model_name.toLowerCase().split(' '),
  })

  // Update the submission
  const result = await sql`
    UPDATE model_submissions 
    SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP, 
        reviewed_by_id = ${adminId}, approved_model_id = ${model.id}
    WHERE id = ${submissionId}
    RETURNING *
  `

  return {
    submission: result[0] as ModelSubmission,
    model,
  }
}

export async function rejectSubmission(
  submissionId: number,
  adminId: number,
  reason: string
): Promise<ModelSubmission> {
  const sql = getSql()
  const result = await sql`
    UPDATE model_submissions 
    SET status = 'rejected', reviewed_at = CURRENT_TIMESTAMP, 
        reviewed_by_id = ${adminId}, rejection_reason = ${reason}
    WHERE id = ${submissionId}
    RETURNING *
  `
  return result[0] as ModelSubmission
}

export async function getSubmissionsByEmail(email: string): Promise<ModelSubmission[]> {
  const sql = getSql()
  const result = await sql`
    SELECT * FROM model_submissions 
    WHERE submitter_email = ${email}
    ORDER BY submitted_at DESC
  `
  return result as ModelSubmission[]
}
