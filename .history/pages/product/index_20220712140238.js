import Link from 'next/link'
function ProductList() {
    return (
        <>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <h2>Product 1</h2>
            <h2>Product 2</h2>
            <h2>Product 3</h2>
        </>
    )
}

export default ProductList