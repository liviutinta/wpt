// Verify that navigating an about:blank document to a javascript: url remembers
// the baseURI it was created with.
onload = () => {
  promise_test(async test => {
    var frame = document.createElement('iframe');

    frame.src = "about:blank";

    frame.onload = () => {
      assert_equals(document.baseURI, frame.contentDocument.baseURI);

      // We'll need to monitor onload again for the javascript: navigation.
      frame.onload = () => {
        assert_equals(document.baseURI, frame.contentDocument.baseURI);
        assert_equals('foo', frame.contentDocument.body.textContent);
      };
      frame.src = "javascript:'foo'";
    };

    document.body.appendChild(frame);
  }, "javascript: url nav base url test");
};
