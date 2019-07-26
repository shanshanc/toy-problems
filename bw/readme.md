# Question 1
The following is a html file which named `bw.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Bridgewell</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
<script>
(function (i, max_i) {
    for (;i < max_i; i+=1) {
        $.ajax({
            url: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.' + i + '/jquery.min.js',
            success: function () {
                console.log(i);
            }
        });
    }
})(1, 5);
</script>
</body>
</html>
```
## Question 1-1
Please try to explain the reason of using the function expression which is
```
(function(){}());
```

```diff
+ Response 1-1
+ So that the function would be executed upon creation.
```

## Question 1-2
Open `bw.html` with google chrome  
What is the output of console ?  
Did the output reveal `1 2 3 4`, if not please fix it.

```diff
+ Response 1-2
+ One approach could be turning off the deafult asynchronicity by setting the `async` field to be `false`.
```


## Question 1-3
`bw.html` use the external JavaScript file (https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js)  
Why not just put this file to local ?

```diff
+ Response 1-3
+ There are several adventages of using exernal JS file including size, maintenance, cache, etc. One big adventage if that popular JS files are hosted on Content Delivery Network, which can be a way of decrease server loading, increase serving efficiency, and reduce network latency (for end users).
```

# Question 2
The following script may execute normally in chrome, but raise exception in IE8.
How to fix it?
```html
<script>
var f = function () {
    console.log(this.name);
};

// var another = f.bind({ name: 'welcome' });
var another = f.apply(f, {name: 'welcome'})
another();  // welcome
</script>
```

```diff
+ Response 2
+ Not sure if we're allowed to search on the Internet, but there is a pretty good compatibility script from Mozilla. Please find the updated version below.

+ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Browser_compatibility
```

```html
<script>
// compatibility script from Mozilla
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// original code
var f = function () {
    console.log(this.name);
};

var another = f.bind({ name: 'welcome' });
another();  // welcome
</script>
```