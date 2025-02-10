import Skeleton from "react-loading-skeleton"

function HeaderSkeleton() {

    return (
        <>
            <div className="header__content">
                <div className="header__logo">
                    <Skeleton width={146} height={40}/>
                </div>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li><Skeleton width={77} height={28}/></li>
                        <li><Skeleton width={77} height={28}/></li>
                        <li><Skeleton width={77} height={28}/></li>
                    </ul>
                </nav>
                <div className="header__actions">
                    <Skeleton width={98} height={32}/>
                    <Skeleton width={87} height={32}/>
                    <Skeleton width={38} height={32}/>
                </div>
            </div>
        </>
    )
}

export default HeaderSkeleton