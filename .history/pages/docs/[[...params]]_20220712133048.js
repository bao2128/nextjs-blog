import { useRouter } from "next/router"

function doc() {
    const router = useRouter()
    const {params = []} = router.query
    console.log(params)
    const pLength = params.length
    if (pLength === 2) {
        return <h1>Docs/{params[0]}/{params[1]}</h1>
    } else if (pLength === 1) {
        return <h1>Docs/{params[0]}</h1>
    }
    return <h1>Docs Home page</h1>
}

export default doc