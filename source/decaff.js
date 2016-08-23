export default React.createClass({

  getDefaultProps() {
    return {
      cvc: null,
      expiry: '',
      expiryAfter: 'valid thru',
      expiryBefore: 'month/year',
      focused: null,
      name: '',
      number: null,
      shinyAfterBack: '',
      type: null,
    }
  },

  render() {
    let isAmex = this.state.type && this.state.type.name === "amex"
    ({
      getValue(name){ return this[name]() },

      componentWillMount() { return this.updateType(this.props) },
      componentWillReceiveProps(nextProps){ return this.updateType(nextProps) },
      getInitialState() { return {type: {name:"unknown", length: 16}} },
      updateType(props){

        let type
        if (!props.number) {
          return this.setState({type: { name:"unknown", length: 16
        }})
        }

        if (type = validate.cardType(props.number)) {
          if (type === "amex") {
            return this.setState({type: { name:type, length: 15
          }})
          } else {
            return this.setState({type: { name:type, length: 16
          }})
          }
        }

        return this.setState({type: { name:"unknown", length: 16
      }})
      },


      number() {
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
        }
      }
    })

    let iterable = __range__(1, amountOfSpaces, false)
    for (let j = 0 j < iterable.length; j++) {
      let i = iterable[j]
      let space_index = ((i*4) + (i - 1))
      var string = string.slice(0, space_index) + " " + string.slice(space_index)
    }

    return string
  },

  name() {
    if (this.props.name === "") {
      return "FULL NAME"
    } else {
      return this.props.name
    }
  },

  expiry() {
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
  },

  cvc() {
    if (this.props.cvc === null) {
      return "•••"
    } else {
      return this.props.cvc.toString().length <= 4 ? this.props.cvc : this.props.cvc.toString().slice(0, 4)
    }
  }
})


let exp = module.exports
exp.prefix = "react-credit-card"


function __range__(left, right, inclusive) {
  let range = []
  let ascending = left < right
  let end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}

/**
 * @todo Needs rewrite
 *
 * 1. View
 * <div className = "#{exp.prefix}__container">
 * <div className = { "#{exp.prefix} " + @typeClassName() + if @props.focused  is "cvc" and not isAmex then " #{exp.prefix}--flipped" else ""} >
 *
 * <div className = "#{exp.prefix}__front" >
 * <div className = "#{exp.prefix}__lower">
 * <div className = "#{exp.prefix}__shiny"/>
 * <img
 * className = {"#{exp.prefix}__logo " + @typeClassName()}
 * src = {images[if @props.type then @props.type else @state.type.name]}
 * />
 * {if isAmex then <div className = {@displayClassName("cvc_front")}>{@getValue("cvc")}</div>}
 * <div className = {@displayClassName("number")}>{@getValue("number")}</div>
 * <div className = {@displayClassName("name")}  >{@getValue("name")}</div>
 * <div
 * className = {@displayClassName("expiry")}
 * data-before = {@props.expiryBefore}
 * data-after = {@props.expiryAfter}
 * >{@getValue("expiry")}</div>
 * </div>
 * </div>
 *
 * <div className = "#{exp.prefix}__back">
 * <div className = "#{exp.prefix}__bar"/>
 * <div className = {@displayClassName("cvc")}>{@getValue("cvc")}</div>
 * <div className = "#{exp.prefix}__shiny" data-after = {@props.shinyAfterBack}/>
 * </div>
 * </div>
 * </div>
 *
 * 2.
 *    displayClassName:(base)->
 *      className = "#{exp.prefix}__" + base + " #{exp.prefix}__display"
 *
 *      if @props.focused is base
 *        className += " #{exp.prefix}--focused"
 *
 *      return className
 *
 * 3.
 *    typeClassName:-> "#{exp.prefix}--" + if @props.type then @props.type else @state.type.name
 **/
