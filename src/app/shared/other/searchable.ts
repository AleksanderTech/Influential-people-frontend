export interface Searchable<T>{
    
  onEntitySearching(searchValue: string):void;
  onEntityChoosing(chosenEntity: T):void
}