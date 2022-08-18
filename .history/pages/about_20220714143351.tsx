import Layout from '../components/layout'

function about() {
    return <h1>About Page</h1>
}

export default about

about.getLayout = function getLayout(page) {
    return (
      <Layout>
        <Sidebar />
        {page}
      </Layout>
    )
  }