function review() {
    const router = 
    const { productId, reviewId} = router.query
    return <h1> Review {reviewId} for product {productId}</h1>
}

export default review