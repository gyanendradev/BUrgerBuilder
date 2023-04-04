import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients)
    .map(key=>{
        return <li key={key}><span style={{textTransform:"capitalize"}}>{key}</span> : {props.ingredients[key]}</li>
    });
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.prices.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
};

export default OrderSummary;