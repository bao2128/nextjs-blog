import Link from 'next/Link'
function ProductList() {
    return (
        <>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <h2>
                <Link href='/product/1'>
                    <a>Product 1</a>
                </Link>
            </h2>
            <h2>Product 2</h2>
            <h2>Product 3</h2>
        </>
    )
}

export default ProductList