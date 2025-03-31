import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export { useDispatch, useSelector };

export const useTypedDispatch = () => useDispatch<AppDispatch>();
