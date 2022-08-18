import Layout from '../components/layout.tsx'

function about() {
    return <h1>About Page</h1>
}

export default about

about.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }