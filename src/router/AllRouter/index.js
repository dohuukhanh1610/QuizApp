import { useRoutes } from "react-router-dom"
import { router } from "../router/index"
const AllRoutes = () => {
    const elements = useRoutes(router)
    return (
        <>{elements}</>
    )
}
export default AllRoutes