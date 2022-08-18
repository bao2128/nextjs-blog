impost Link from 'next./ink'

function home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link href='/blog'>
        <a>Blog</a>
      </Link>
    </div>
  )
}

export default home