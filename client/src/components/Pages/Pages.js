import { useSelector, useDispatch } from "react-redux"
import { setPage } from '../../store/StudentsStore'
import classes from '../Pages/Pages.module.css'

const Pages = () => {
    const students = useSelector(state => state.students._students)
    const selectedPage = useSelector(state => state.students._page)
    const totalCount = useSelector(state => state.students._totalResults)
    const limit = useSelector(state => state.students._limit)
    const pageCount = Math.ceil(totalCount / limit)
    const pages = []
    const dispatch = useDispatch()

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <div className={classes.pagesContainer}>
            {pages.map(page =>
                <button
                    className={selectedPage === page
                    ? `${classes.pagesItem_current} ${classes.pagesItem}`
                    : classes.pagesItem
                }
                    key={page}
                    onClick={() => dispatch(setPage(page))}
                >
                    {page}
                </button>
            )}
        </div>
    )
}

export default Pages
