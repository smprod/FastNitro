import {ChakraProvider} from "@chakra-ui/react";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {HomePage, PolicyPage, RegisterPage, Layout, ProfilePage, LoginPage} from "@pages";
import {useRecoilValue} from "recoil";
import {SessionProvider, sessionState} from "@entities";
import {ChangePasswordPage} from "@pages";
import {PrivateRoute} from "@shared";
export const App = () => {
    const session = useRecoilValue(sessionState)
    return (
      <BrowserRouter>
              <SessionProvider>
                  <ChakraProvider>
                      <Routes>
                          <Route path={"/"} element={<Layout/>}>
                              <Route index element={<HomePage/>}/>
                              <Route path={"policy"} element={<PolicyPage/>}></Route>
                              <Route path={"login"} element={<PrivateRoute redirectPath={"/"} isAllowed={session}><LoginPage/></PrivateRoute>}></Route>
                              <Route path={"register"} element={<PrivateRoute redirectPath={"/"} isAllowed={session}><RegisterPage/></PrivateRoute>}></Route>
                              <Route path={"profile"} element={<PrivateRoute redirectPath={"/"} isAllowed={!session}><ProfilePage/></PrivateRoute>}></Route>
                              <Route path={"changepassword"} element={<PrivateRoute redirectPath={"/"} isAllowed={!session}><ChangePasswordPage/></PrivateRoute>}></Route>
                          </Route>
                      </Routes>
                  </ChakraProvider>
              </SessionProvider>
      </BrowserRouter>
  )
}