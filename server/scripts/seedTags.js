import 'dotenv/config'
import connectDB from '../configs/mongodb.js'
import Tag from '../models/Tag.js'

const defaultTags = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'MongoDB',
  'SQL',
  'PostgreSQL',
  'Python',
  'Django',
  'Flask',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'DevOps',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Firebase',
  'CSS',
  'HTML',
  'Git',
  'Testing',
  'REST',
  'GraphQL',
  'Mobile',
  'iOS',
  'Android',
  'Business',
  'Marketing',
  'Design',
]

const seed = async () => {
  try {
    await connectDB()

    const results = {
      created: [],
      skipped: []
    }

    for (const name of defaultTags) {
      const existing = await Tag.findOne({ name })
      if (existing) {
        results.skipped.push(name)
        continue
      }
      const tag = await Tag.create({ name })
      results.created.push(tag.name)
    }

    console.log('Seeding complete')
    console.log('Created:', results.created.length, results.created)
    console.log('Skipped (already existed):', results.skipped.length, results.skipped)

    process.exit(0)
  } catch (err) {
    console.error('Seeding failed:', err)
    process.exit(1)
  }
}

seed()
