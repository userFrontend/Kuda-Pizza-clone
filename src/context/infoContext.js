import { act, createContext, useContext, useEffect, useReducer, useState } from "react"
import { getProd } from "../api/getRequest"
import { toast } from "../components/Message/ToastContainer";

const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

const orderReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.item.id);
      if (existingItem) {
        // If the item already exists, increase the quantity
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.item[0]}],
        };
      }
      break;
    case 'INCREASE':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
      break;
      case 'DECREASE':
        newState = {
          ...state,
          items: state.items.reduce((acc, item) => {
            if (item.id === action.id) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              } else if (item.quantity === 1) {
                const shouldRemove = window.confirm('Удалить этот товар из корзины?');
                if (!shouldRemove) {
                  acc.push(item);
                }
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, []),
        };
        break;
  
    case 'RESET':
      newState = { items: [] };
      break;
    default:
      return state;
  }
  localStorage.setItem('order', JSON.stringify(newState.items));
  return newState;
};

export const InfoProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile")) || null)
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem("order")) || [])
    const [cards, setCards] = useState([])
    const [users, setUsers] = useState([])
    const [categorys, setCategorys] = useState([])
    const [loadingRes, setLoadingRes] = useState(false)
    const [basket, setBasket] = useState(false)
    const [prodId, setProdId] = useState(null);
    const [modal, setModal] = useState(false);
    const [state, dispatch] = useReducer(orderReducer, {
        items: JSON.parse(localStorage.getItem('order')) || []
    });

      const total = state.items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
    
    const modalToggle = () => setModal(!modal)
    const toggleReset = () => setLoadingRes(!loadingRes)
    const toggleBasket = () => setBasket(!basket)
    

    const [count, setCount] = useState(state.items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0) || 0)

    useEffect(() => {
      const newCount = state.items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
      setCount(newCount);
  }, [state]);

    useEffect(()=>{
        const getAllProd = async () => {
            try {
                const res = await getProd('prod')
                const user = await getProd('user')
                const cat = await getProd('category')
                setCards(res?.data?.getAll)
                setUsers(user?.data?.users)
                setCategorys(cat?.data?.getAll)
            } catch (error) {
              console.log(error);
            }
        }
        getAllProd()
    },[currentUser, loadingRes])

    const exit = () => {
        localStorage.clear()
        setCurrentUser(null)
        toast('Вы успешно вышли из своей учетной записи', 'success')
    }
    
     const value = {
        currentUser, setCurrentUser, exit,
        count, setCount, modal, setModal, modalToggle,
        basket, setBasket, toggleBasket, total, state, dispatch,
        orders, setOrders, prodId, setProdId, toggleReset, cards, setCards,
        users, setUsers, loadingRes, setLoadingRes, categorys, setCategorys
        
    }

 
    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    )
}