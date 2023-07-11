// Verify that an about:blank or about:srcdoc document remembers the baseURI
// it was created with even after it's detached.
const runTest = (frame_type) => {
  promise_test(async test => {
    var frame = document.createElement('iframe');

    if (frame_type == "about:blank")
      frame.src = "about:blank";
    else
      frame.srcdoc = "foo";

    frame.onload = () => {
      var frame_doc = frame.contentDocument;
      assert_equals(document.baseURI, frame_doc.baseURI);
      frame.remove();
      assert_equals(document.baseURI, frame_doc.baseURI);
    };

    document.body.appendChild(frame);
  }, frame_type);
};

onload = () => {
  runTest("about:blank");
  runTest("about:srcdoc");
};
