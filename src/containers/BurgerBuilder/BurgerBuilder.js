import React,{Component} from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const IngredientPrices={
    salad:0.5,
    meat:1.5,
    bacon:2,
    cheese:1
}

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        }
        ,totalPrice:4,
        purchasable:false,
        purchasing:false
    }
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const newCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=newCount;
        const priceAddition=IngredientPrices[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchasableHandler(updatedIngredients);
    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if (oldCount===0){
            return;
        }
        const newCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=newCount;
        const priceAddition=IngredientPrices[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceAddition;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchasableHandler(updatedIngredients);
    }

    updatePurchasableHandler=(ingredients)=>{
        const total=Object.keys(ingredients)
        .reduce((sum,key)=>{
            return sum+ingredients[key];
        },0)
        this.setState({purchasable:total>0});
    }
    
    updatePurchasing=()=>{
        this.setState({purchasing:true});
    }
    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        alert("you Continue");
    };
    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for (let index in disabledInfo) {
            disabledInfo[index] = disabledInfo[index]<=0;
        };
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancel={this.cancelPurchaseHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    prices={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 ingredientAdd={this.addIngredientHandler}
                 removeIngredient={this.removeIngredientHandler}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}
                 purchasable={this.state.purchasable}
                 purchasing={this.updatePurchasing}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;