import { makeAutoObservable } from "mobx";
import { CoordsData } from "../types/coords.types";

class CoordsStore {
  coordsList = [] as CoordsData[];
  userCords = {} as CoordsData;
  constructor() {
    makeAutoObservable(this);
  }
  add = (newCoords: CoordsData) => {
    this.coordsList = [...this.coordsList, newCoords];
  };

  remove = (id: number) => {
    this.coordsList = this.coordsList.filter((item) => item.id !== id);
  };

  clear = () => {
    this.coordsList = [];
  };

  setUserCords = (userCords: CoordsData) => {
    this.userCords = userCords;
  };
}

export default new CoordsStore();
