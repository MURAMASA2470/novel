import { Component, createSignal, For, ParentProps, Setter, Show, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const SelectItemListClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .select_items {
    width: 200px;
    height: 25px;
    position: relative;
    user-select: none;
  }
  
  .select_list {
    width: 100%;
    height: 100%;
    border-bottom: solid 1px white;
    font-size: 1rem;
    margin: 5px;

    &_opener:before {
      position: absolute;
      top: 12px;
      right: 5px;
      width: 0;
      height: 0;
      padding: 0;
      content: '';
      z-index: 2;
      pointer-events: none;
      -webkit-transition: all 100ms cubic-bezier(.4, .25, .3, 1);
      transition: all 100ms cubic-bezier(.4, .25, .3, 1);
    }

    &_opener[data-is-open='true']:before {
      border-right: 6px solid transparent;
      border-bottom: 6px solid #ffffff;
      border-left: 6px solid transparent;
    }
    
    &_opener[data-is-open='false']:before {
      border-top: 6px solid #ffffff;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
    }

    .selected_item_label {
      margin-left: 10px;
    }
    
    &_options {
      margin-top: 5px;
      margin-left: 10px;
    }
  }
`;

type ItemType = { itemKey: string, itemName: string }

export type SelectItemListType = ParentProps & {
  itemList: ItemType[]
  setSelectedItemKey: Setter<string>,
  defaultValue?: string
}

const SelectItemList: Component<SelectItemListType> = (props: SelectItemListType) => {
  
  const defaultValue = props.defaultValue ?? '全て'

  const handleItemClick = (key: string, index: number) => {
    setSelectedItemName(props.itemList.find(x => x.itemKey == key)?.itemName ?? defaultValue)
    props.setSelectedItemKey(key)
  }

  const [ selectedItemName, setSelectedItemName ]: Signal<string> = createSignal(defaultValue)
  const [ isOpen, setIsOpen ]: Signal<boolean> = createSignal(false)

  return (
    <div class={SelectItemListClass}>
      <div class='select_items'>
        <div class='select_list' onClick={() => setIsOpen(!isOpen())}>
          <i class='select_list_opener' data-is-open={isOpen()}></i>
          <label class='selected_item_label'>{selectedItemName()}</label>
          <Show when={isOpen()}>
            <div class='select_list_options'>
              <For each={props.itemList} fallback={<div>Loading...</div>}>
                {(item: ItemType, index) => (
                  <div data-item-idex={index()}
                      data-item-key={item.itemKey}
                      onClick={() => handleItemClick(item.itemKey, index())}>
                    {item.itemName}
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default SelectItemList;
