import PagePlaceholder from '../../components/common/PagePlaceholder.jsx'
import { useParams } from 'react-router-dom'

const AlgorithmDetails = () => {
  const { slug } = useParams()

  return (
    <PagePlaceholder
      eyebrow="Learn"
      title="Algorithm Details"
      description={`Algorithm visualization, explanation, complexity analysis, code snippets, and practice questions for "${slug}" will be displayed here.`}
    />
  )
}

export default AlgorithmDetails
