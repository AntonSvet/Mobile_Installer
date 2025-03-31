import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";

export { useDispatch, useSelector };

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
