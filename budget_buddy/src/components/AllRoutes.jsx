import {Routes,Route} from "react-router-dom"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import SignUp from "../Pages/CreateAccount"
import  CurrencyConversion from "../Pages/CurrencyConversion"
import { Account } from "../Pages/Account"
import CreateAccount from "../Pages/CreateAccount"
import TransactionPage from "../Pages/Transactions"
function AllRoutes(){

return (
    <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/currency" element={<CurrencyConversion/>}/>
    <Route path="/account" element={<Account/>}/>
    <Route path="/transaction" element={<TransactionPage/>}/>
    <Route path="/createaccount" element={<CreateAccount/>}/>
    </Routes>
)
}
export default AllRoutes