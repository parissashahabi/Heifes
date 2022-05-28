import React from 'react'
import { StoreProvider, Store} from '../../utils/store';
import {fireEvent, render} from "@testing-library/react";


describe("StoreProvider", () => {
    it("userInfo is null by default",() => {
        const {getByText} = render(<StoreProvider>
            <Store.Consumer>
                {
                    value => <>
                    <span>User Info: {value.state.userInfo}</span>
                    </>
                }
            </Store.Consumer>
        </StoreProvider>)

        expect(getByText('User Info:')).toBeTruthy();
    });

   describe("USER_LOGIN", () => {
       it("fill userInfo with payload",()=>{
           const {getByText} = render(<StoreProvider>
               <Store.Consumer>
                   {
                       value => <>
                           <span>User Info: {value.state.userInfo}</span>
                           <button onClick={()=>{
                               value.dispatch({ type: 'USER_LOGIN', payload:  "paris" });
                           }
                           }>Login</button>
                       </>
                   }
               </Store.Consumer>
           </StoreProvider>);

           fireEvent.click(getByText('Login'));
           expect(getByText('User Info: paris')).toBeTruthy();

       })
   })

    describe("USER_LOGOUT", () => {
       it("set userInfo to null", () =>{
           const {getByText} = render(<StoreProvider>
               <Store.Consumer>
                   {
                       value => <>
                           <span>User Info: {value.state.userInfo}</span>
                           <button onClick={()=>{
                               value.dispatch({ type: 'USER_LOGIN', payload:  "paris" });
                           }
                           }>Login</button>
                           <button onClick={()=>{
                               value.dispatch({ type: 'USER_LOGOUT' });
                           }
                           }>Logout</button>
                       </>
                   }
               </Store.Consumer>
           </StoreProvider>);

           fireEvent.click(getByText('Login'));
           fireEvent.click(getByText('Logout'));

           expect(getByText('User Info:')).toBeTruthy();
       })
   })


});


