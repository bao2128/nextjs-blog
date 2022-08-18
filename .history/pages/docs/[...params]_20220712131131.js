import { useRouter } from "next/router"

function doc() {
    const router = useRouter()
    const {params} = router.query
    console.log(params)
    return <h1>Docs Home page</h1>
}

export default doc