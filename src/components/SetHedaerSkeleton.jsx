import Skeleton from "react-loading-skeleton"

function SetHedaerSkeleton({ categoryCount }) {
  return Array(categoryCount).fill(0)
  .map((_, index) => (
    <div className="skeleton_menu_header" key={index}>
        <Skeleton width={90} height={34}/>
    </div>
  ))
}

export default SetHedaerSkeleton