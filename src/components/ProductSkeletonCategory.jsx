import Skeleton from 'react-loading-skeleton'

function ProductSkeletonCategory({ categoryCount, itemsCount }) {
  return Array(categoryCount).fill(0)
  .map((_, index) => (
    <div className="category_wrapper" key={index}>
      <h2><Skeleton width={300}/></h2>
      <section className="product_category_block">
          {Array(itemsCount).fill(0).map((_, index) => (
              <div className="product_item" key={index}>
                  <Skeleton height={191}/>
                  <div className="product__item_desc_wrapper">
                      <div className="product_item_info">
                        <Skeleton width={80}/>
                        <Skeleton height={60}/>
                      </div>
                  </div>
              </div>
          ))}
      </section>
    </div>
  ))
}

export default ProductSkeletonCategory