/**
 * @export Card
 * @description Renders react-native flavor of @jesspollak interactive credit card component
 * @implements Payment node module for validating forms and formatting numbers
 * @see https://github.com/descomplica/react-credit-card
 * @see https://github.com/jessepollak/card
 * @see https://github.com/jessepollak/payment
 * @todo comparamentalize into smart/dumb component(s)/container(s)
 */
import Payment from 'payment'
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

/**
 * @const cardBackgroundImages
 * @description Card images are rendered in base64 bitmaps for consistent image file types cross-platform
 * @returns array of credit card bitmap64 images for setting the credit card background following validation of credit card type
 * @todo introduce more card images (dinersclub, elo, jcb, laser, maestro, unionpay, etc.)
 */
const cardBackgroundImages = {
  'amex'       : 'data:image/gif;base64,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',
  'discover'   : 'data:image/gif;base64,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',
  'mastercard' : 'data:image/gif;base64,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',
  'visa'       : 'data:image/gif;base64,R0lGODlhOQAjAPcAAABEjGagzdqIAAAofNNuAJq/0zl+rwBJkABZlgASbgBQkyJupgAsgAA6hwBGjdmDAE2LtzN7rXOlx85lAABjngBJjgAzggAqfABSlNmGAAAZcgBUlQBCjIezzQBcnAA3hQAneQA1gwAWcQA4hQBenAAfdgAgdAAtfgBAiQA8hgA9iABamQBZmwBXmABWlgAwgABNkgAieAA+iQBZmABQlABOlABMkQAOaxNnnmWdwmadw22hxduMAxNnn2afzGaexgBBimmfxABVlgBVl7fR4diEANV5AP///AA0gW6ixWai0f///tJ1AABCiuOxVgBKjgBUlmaex9mFAABAipi91ZC2z3qoyWqfxABKjdzn8QAIaJS70wBgnafI29yOAy52qpG80tfp7cHb5pK60zSArWyfwQBSlvj9/QAXbwBEi16YvfH5+v3+/tZ7AKDC1dLg6Rlro2Wew3qqyfX4+ESGtKbF2gtinI+40gAFZd+mRFSTu6zK34i10NmEANNxAE+OuXWryABGjvz/+f3//XikxwAsehRon5i/0xRooOCtUe/0+WygxmyixGyixtjo7GWcvhRnn+GrRghdm93r8Yixy4qxzsje52aeyHOiwfD3+I620Orx9O709mObwJ3E3IWzzwAbdEuJswBhoHKoyM9sAABbm7DM2rLM27PP2+GuTG+kxPP4+vz8/Zi909/o74i1zwBUkT+Fsg9inGacxD2AtJ6+1T+EtBxrowA5hZS90oCvyoWuylORux9updvn7nyoyUKDs+Tu9EGFsefw8wBRlmacwkuMtjZ9rwAxgSl1psTZ5MTY5whhnGadwYy60VqSul2VvGiexGmexXepx73U5LzW5gA6iNmBAFqYvdnn6/v8/q7M3/X6+Za61Yu20GWcwtBxAPr8+dNyAJe+1k+NuVWRusfd6FaSu/H399Dg6lCRuQBem0yJtXeryU2PuP///eOwVdV2ANJ0ANuLAwBKjwBUl9uJAABdm9yNAwBOkmai0ABcm5q+1tuLAgBbmv///yH5BAAAAAAALAAAAAA5ACMAAAj/AMkRocKvoMGDCBMqXMgwIRUif3b8m0ixosWLGDNq3Lij0T8gNYbUG0mypMmTKFOqHDnkAIZ/0ZL8++BAQb6bOHPq3Mmzp8+bCoA4+HdFogMh9/YpXcq0qdOnUKMqJaEAyr8gEgFs2Oevq9evYMOKHUu26758G65m3Vq2rdu3/s6mxfovENJ7ePPq3cu3r9+/eKlaDSLTQhN6iBMrXsy4sePHiW2oAEJ00T9YzCDh2IyjB2fOnj93Fh1aNGjTog35k/VP2reNsGPL1vhNh8Zs1c5oy3TE4plJ/waxyTRnIrdcowB1uTiI1ZrYOWxnPPJMQwM05Sp+SKDgH6gRN9L9/3sE4oKIBBpifKHoynqCPbCjw0aQrwE2iuyQXfjXDcnNf9CU0IICznhCxg21UISBA+tY0Ep80mkEBz1AGDPRJhcwsMs/ksDQACH/gHAPEllQ1NtEVVxQAwm4/AIhbAscwAEdE7lggRkThVDKCe9kcYEoMnRS0RI5coAJMSno8eJGEQDgQAT/pMgAOv9sYUFLExVSAwXIJGMRMBpA8E8IAByzpEbCcAAALTMx8MhECzgwBTsTWRLDFBSocAE1EwVT3j+rIHHALWdmxMsUFahRxgVPUGSNPy8sUxEzFlBAgwmC/CPEAHdMhIsN/hSKURwpeDADDAP4MtE2FrTQxEW6qP/AxQn/EHEBDL0gYseAMIh6kRW4kOCBBaFQZEAaQBjwjykVKYIECzL8A4BWB6CABQtCULaRfBtR0gAFGKRQkQMrWGDOP3hgAEYY4zzRQgma8DHAARWh0IIMRGrErUaV3DBCAspQVIcWyJTwDyolgCCCCBqcMAAjnGiRgBgVxXDCDW9sG2FGjgDySgEVndJOB25QNIY67pzzSTj/FKDKIRZ14M00w2xbzGw457xRM5f8k0cqTsAj9NBEwxN00UgnrbTSTkSSyD+zBPDPBH7EY/XVWGet9dZcd401AeL8E4UP/7QhAD5op6322my37fbbaXshhRT//EC2ERnw0M/efPd27fffgAcu+N48PFBE3XfnPfjijDfeT+GH2/0P3jzMY/nlmGeu+eacd2455Ij/E08f9pRu+umop6766qyffs0DdUs9AQFMyGP77bjnrvvuvPduOxOkgCO2BDoXb/w/Etgihz5K6OP889BHL/301FcPvRIBWBFLQAA7',
}

/**
 * @const validate
 * @description Validates length, numbers, and Luhn algorithm
 * @see https://github.com/jessepollak/payment#paymentfnsvalidatecardnumbernumber
 * @see https://en.wikipedia.org/wiki/Luhn_algorithm
 */
const validate = Payment.fns

/**
 * @function cvc
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

/**
 * @function expiry
 * @returns {*}
 */
function expiry() {
  if (this.props.expiry === "") {
    return "••/••"
  } else {
    let expiry = this.props.expiry.toString()

    /**
     * @const expiryMaxLength
     * @description Maximum expiration date length is set to six digits, caluclated by taking max 2 digits for month, and adding up to max 4 digits for year, giving us 6
     * @type {number}
     */
    let expiryMaxLength = 6 //

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

/**
 * @function getValue
 * @param name
 */
function getValue(name) {
  this[name]()
}

/**
 * @function name
 * @returns {*}
 */
function name() {
  if (this.props.name === "") {
    return "FULL NAME"
  } else {
    return this.props.name
  }
}

/**
 * @function number
 * @returns {*}
 */
function number() {
  var amountOfSpaces,
    i,
    maxLength,
    space_index,
    space_index1,
    space_index2,
    string;

  if (!this.props.number) {
    var string = ""
  } else {
    var string = this.props.number.toString()
    var maxLength = this.state.type.length
  }

  if (string.length > maxLength) {
    var string = string.slice(0, maxLength)
  } while (string.length < maxLength) {
    string += "•"
  }

  if (props.isAmex === true) {
    var string
    let space_index1 = 4
    let space_index2 = 10

    return string = string.substring(0, space_index1) + " " + string.substring(space_index1, space_index2) + " " + string.substring(space_index2)
  } else {
    let amountOfSpaces
    return amountOfSpaces = Math.ceil(maxLength/4)

    let iterable = __range__(1, amountOfSpaces, false)
    for (let j = 0; j < iterable.length; j++) {
      let i = iterable[j]
      let space_index = ((i*4) + (i - 1))
      var string = string.slice(0, space_index) + " " + string.slice(space_index)
    }
  }
}

/**
 * @function updateType
 * @param props
 * @returns {*|void}
 */
function updateType(props) {
  if (!props.number) {
    return this.setState({
      type: {
        name: "unknown", length: 16
      }
    })
  }

  if (type = validate.cardType(props.number)) {
    if (props.isAmex === true) {
      this.setState({
        type: {
          name: type, length: 15
        }
      })
    } else {
      this.setState({
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
 * @class Card
 * @classdesc render react-native credit card visual component
 */
class Card extends Component {
  constructor(props, defaultProps) {
    super(props, defaultProps)
    this.state = {
      type: {
        length: 16,
        name: 'unknown',
      }
    }
  }

  componentWillMount(props) {
    // return this.updateType(props)
  }

  componentWillReceiveProps(nextProps) {
    // return this.updateType(nextProps)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.cardFront}>
            <Image
              style={styles.float__cardChip}
            />
            <Image
              source={{uri: cardBackgroundImages.visa}}
              style={[styles.float__cardImageLogo, styles.isPrimary]}
            />
            <Text style={[styles.float__number, styles.isPlaceHolder]}>••••  ••••  ••••  ••••</Text>
            <Text style={[styles.float__number, styles.isPrimary]}>{this.props.number}</Text>

            <Text style={[styles.float__name, styles.isPlaceHolder]}>YOUR  NAME</Text>
            <Text style={[styles.float__name, styles.isPrimary]}>{this.props.name}</Text>

            <Text style={[styles.float__expiry, styles.isPlaceHolder]}>••/••</Text>
              <Text style={[styles.float__expiry, styles.isPrimary]}>{this.props.expiry}</Text>
          </View>
        </View>
        <View style={styles.cardBack}>
          <Text style={styles.float__cvc}>{this.props.cvc}</Text>
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.textInputBorder}>
            <TextInput
              defaultValue={this.props.name}
              placeholder={this.props.name}
              style={styles.textInputFull}
            />
          </View>
          <View style={styles.textInputBorder}>
            <TextInput
              defaultValue={this.props.number}
              placeholder={this.props.number}
              style={styles.textInputFull}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.textInputBorder}>
              <TextInput
                defaultValue={this.props.expiry}
                placeholder={this.props.expiry}
                style={styles.textInputHalf}
              />
            </View>
            <View style={styles.textInputBorder}>
              <TextInput
                defaultValue={this.props.cvc}
                placeholder={this.props.cvc}
                style={styles.textInputHalf}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Card

/**
 * Set card prop types, and prop defaults
 * @todo introduce shinyAfterBack prop per original Card repo designs
 */
Card.propTypes = {
  cvc: React.PropTypes.string,
  expiry: React.PropTypes.string,
  expiryAfter: React.PropTypes.string,
  expiryBefore: React.PropTypes.string,
  isAmex: React.PropTypes.bool,
  isFlipped: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  name: React.PropTypes.string,
  number: React.PropTypes.string,
  type: React.PropTypes.func,
}

Card.defaultProps = {
  cvc: 'CVC',
  expiry: 'MM/YY',
  expiryAfter: 'valid thru',
  expiryBefore: 'MM/YY',
  focused: null,
  isAmex: false,
  isFlipped: false,
  isFocused: false,
  name: 'Your Name',
  number: 'Card Number',
  type: null,
}

/**
 * @const styles
 * @implements StyleSheet from react-native
 * @description includes containers for the view, card, logo and background colors for different credit card brands
 */
const styles = StyleSheet.create({
  __amex: {
    backgroundColor: '#108168',
  },
  __discover: {
    backgroundColor: '#86B8CF',
  },
  __mastercard: {
    backgroundColor: '#0061A8',
  },
  __unknown: {
    backgroundColor: 'transparent',
  },
  __visa: {
    backgroundColor: '#191278',
  },
  cardBack: {
    opacity: 0,
  },
  cardContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#9EC3D7',
    borderRadius: 6,
    flex: 1,
    height: 175,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    width: 280,
  },
  cardFront: {},
  container: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'space-between',
  },
  textInputBorder: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  textInputContainer: {
    marginBottom: 40,
  },
  textInputFull: {
    color: '#7B797C',
    flex: 1,
    fontSize: 16,
    marginTop: 26,
    paddingBottom: 14,
    paddingTop: 22,
    width: 280,
  },
  textInputHalf: {
    color: '#7B797C',
    fontSize: 16,
    marginTop: 26,
    paddingBottom: 14,
    paddingTop: 22,
    width: 126,
  },
  float__cardChip: {
    backgroundColor: '#CCC',
    borderRadius: 5,
    height: 23.25,
    position: 'absolute',
    left: 0,
    top: 40,
    width: 36,
    zIndex: 1,
  },
  float__cardImageLogo: {
    height: 25,
    position: 'absolute',
    right: 0,
    top: 35.5,
    width: 40,
    zIndex: 1,
  },
  float__number: {
    fontSize: 18,
    fontWeight: '700',
    flexWrap: 'nowrap',
    letterSpacing: 2.55,
    left: 0,
    position: 'absolute',
    top: 75.5,
  },
  float__name: {
    fontSize: 15,
    fontWeight: '600',
    left: 0,
    letterSpacing: 0.5,
    position: 'absolute',
    top: 110,
  },
  float__expiry: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.35,
    position: 'absolute',
    right: 0,
    top: 111.5,
  },
  float__cvc: {
    fontSize: 13,
    position: 'absolute',
    right: 0,
    top: 110,
  },
  isPlaceHolder: {
    color: 'white',
    opacity: 1,
  },
  isPrimary: {
    opacity: 0,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
