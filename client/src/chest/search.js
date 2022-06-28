import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Button, Checkbox, Input } from 'antd'
import { IoFilter } from 'react-icons/io5'

const InputSearch = styled.div`
  width: 85%;
  padding: 0px !important;

  @media only screen and (min-width: 450px) {
    width: 100%;
  }

  .input-search__container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    color: #6e6893;
    input {
      width: 250px;
      background-color: #f4f2ff;
      border: none;
      padding: 7px 5px 7px 15px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #a494ff;
    }
    input::placeholder {
      color: #6e6893;
      font-size: 16px;
      height: 40px;
    }
  }
`

const FilterSearch = styled.div`
  position: relative;
  .search__filter-button {
    height: 100%;
    border-radius: 5px;
  }

  .search__filter-popup {
    border: 1px solid gray;
    position: absolute;
    z-index: 9;
    background-color: #fff;
    padding: 5px 10px;
    top: 0px;
    left: 100%;
    white-space: nowrap;
    flex-direction: column;
    max-height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    > * {
      margin: 0px;
    }

    .filter-popup__button-group {
      display: flex;
      margin-top: 5px;
      justify-content: center;
      button {
        margin-left: 5px;
        padding: 0 20px !important;
        min-height: 0px;
      }
    }

    input {
      width: 100%;
    }
  }
`

export default function Search(props) {
  const [toggleFilterPopup, setToggleFilterPopup] = useState(false)
  const [vInputFilter, setVInputFilter] = useState(null)

  useEffect(() => {
    if (!props.allowSearch && props.columns.length > 0) {
      props.setAllowSearch(props.columns.map((c) => (c.className.indexOf('on-search') >= 0 ? c.dataIndex : null)).filter((i) => i !== null))
    }

    if (vInputFilter && vInputFilter.target.value) {
      props.filterByValue(vInputFilter)
    }
  }, [props.columns, props.allowSearch, props.data])

  return (
    <InputSearch className="input-search">
      <div className="input-search__container">
        <FilterSearch className="search__filter" isOpen={toggleFilterPopup}>
          <Button
            className="search__filter-button btn-close no-padding"
            onClick={() => {
              setToggleFilterPopup(!toggleFilterPopup)
            }}>
            <IoFilter />
          </Button>
          <div className="search__filter-popup">
            {props.columns.map(
              (c) =>
                c.className.indexOf('on-search') >= 0 && (
                  <Checkbox
                    key={c.dataIndex}
                    value={c.dataIndex}
                    checked={props.allowSearch && props.allowSearch.indexOf(c.dataIndex) >= 0 ? true : false}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        props.setAllowSearch(props.allowSearch.filter((i) => i != e.target.value))
                      } else {
                        props.setAllowSearch([...props.allowSearch, e.target.value])
                      }
                    }}>
                    {c.title}
                  </Checkbox>
                )
            )}
            <div className="filter-popup__button-group">
              <Button
                className="btn-primary"
                onClick={() => {
                  let cFilter = props.columns.filter((c) => c.className.indexOf('on-search') >= 0)
                  if (cFilter.length > props.allowSearch) {
                    let c = cFilter.map((item) => item.dataIndex)
                    props.setAllowSearch(c)
                  } else {
                    props.setAllowSearch([])
                  }
                }}>
                ทั้งหมด
              </Button>
              <Button
                className="btn-primary"
                onClick={() => {
                  setToggleFilterPopup(false)
                }}>
                ปิด
              </Button>
            </div>
          </div>
        </FilterSearch>
        <Input
          className="search__input"
          placeholder="ค้นหาในตาราง"
          onChange={(e) => {
            props.filterByValue(e)
            setVInputFilter(e)
          }}
          disabled={props.data ? false : true}
        />
      </div>
    </InputSearch>
  )
}
