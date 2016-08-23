import Payment from 'payment'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
/**
 * Delete this dependency, or naw?
 */
import images from './card-images.js'

/**
 * @todo Set styles for React-Native appropriately
 * @see './card.css'
 * @see './card-types.css'
 * @type {{}}
 */
const styles = StyleSheet.create({})

/**
 * Scope previously rendered constants
 */
const validate = Payment.fns

/**
 * Render initialState in appropriate position
 */
const initialState = {
  type: {
    length: 16,
    name: 'unknown',
  }
}

/**
 * @todo figure out why this was set onRender()
 */
let isAmex = this.state.type && this.state.type.name === 'amex'

/**
 * Begin converted CoffeeScript functions
 * @param name
 */
function cvc() {
  if (this.props.cvc === null) {
    return "•••"
  } else {
    return this.props.cvc.toString().length <= 4 ? this.props.cvc : this.props.cvc.toString().slice(0, 4)
  }
}

function expiry() {
  if (this.props.expiry === "") {
    return "••/••"
  } else {

    let expiry = this.props.expiry.toString()

    let expiryMaxLength = 6 // 2 for month and 4 for year

    if (expiry.match(/\//)) {
      expiry = expiry.replace("/", "")
    }

    if (!expiry.match(/^[0-9]*$/)) {
      return "••/••"
    }

    while (expiry.length < 4) {
      expiry += "•"
    }

    expiry = expiry.slice(0, 2) + "/" + expiry.slice(2, expiryMaxLength)

    return expiry
  }
}

function getValue(name) {
  this[name]()
}

function name() {
  if (this.props.name === "") {
    return "FULL NAME"
  } else {
    return this.props.name
  }
}

function number() {
  if (!this.props.number) {
    var string = ""
  } else {
    var string = this.props.number.toString()
  }

  let maxLength = this.state.type.length

  if (string.length > maxLength) { var string = string.slice(0,maxLength) }

  while (string.length < maxLength) {
    string += "•"
  }

  if (this.state.type.name === "amex") {
    var string
    let space_index1 = 4
    let space_index2 = 10

    return string = string.substring(0, space_index1) + " " + string.substring(space_index1, space_index2) + " " + string.substring(space_index2)
  } else {
    let amountOfSpaces
    return amountOfSpaces = Math.ceil(maxLength/4)

    let iterable = __range__(1, amountOfSpaces, false)
    for (let j = 0 j < iterable.length; j++) {
      let i = iterable[j]
      let space_index = ((i*4) + (i - 1))
      var string = string.slice(0, space_index) + " " + string.slice(space_index)
    }
  }
}

function updateType(props) {
  let type
  if (!props.number) {
    return this.setState({
      type: {
        name: "unknown", length: 16
      }
    })
  }

  if (type = validate.cardType(props.number)) {
    if (type === "amex") {
      return this.setState({
        type: {
          name: type, length: 15
        }
      })
    } else {
      return this.setState({
        type: {
          name: type, length: 16
        }
      })
    }
  }

  return this.setState({
    type: {
      length: 16,
      name: 'unknown',
    }
  })
}

/**
 * @export card
 * @description render React-Native component
 */
class card extends Component {
  constructor(props) {
    super(props)
  }

  defaultProps = {
    cvc: null,
    expiry: '',
    expiryAfter: 'valid thru',
    expiryBefore: 'month/year',
    focused: null,
    name: '',
    number: null,
    shinyAfterBack: '',
    type:null,
  }

  componentWillMount() {
    return this.updateType(this.props)
  }

  componentWillReceiveProps(nextProps) {
    return this.updateType(nextProps)
  }

  render() {
    <View>
      <View></View>
    </View>
  }
}

export default card
