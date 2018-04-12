describe("makeCaching", function() {

  it("запоминает предыдущее значение функции с таким аргументом", function() {
    function f(x) {
      return Math.random() * x;
    }

    f = makeCaching(f);

    var a = f(1);
    var b = f(1);
    assert.equal(a, b);

    var anotherValue = f(2);
    // почти наверняка другое значение
    assert.notEqual(a, anotherValue);
  });

  it("сохраняет контекст вызова", function() {
    var obj = {
      spy: sinon.spy()
    };

    var spy = obj.spy;
    obj.spy = makeCaching(obj.spy);
    obj.spy(123);
    assert(spy.calledWith(123));
    assert(spy.calledOn(obj));
  });

  it("makeCaching(f1) f1_cached(1) f1_cached(2)", function() {
    let f1_x = NaN;
    let f1_result = NaN;
    let f1_callCount = 0;
    function f1(x) { f1_callCount++; f1_x = x; return f1_result; }
    const f1_cached = makeCaching(f1);

    f1_result = 11;
    assert.equal(11, f1_cached(1));
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);

    f1_result = 22;
    assert.equal(22, f1_cached(2));
    assert.equal(2, f1_x);
    assert.equal(2, f1_callCount);
  });

  it("makeCaching(f1=>) f1_cached(1) f1_cached(2)", function() {
    let f1_x = NaN;
    let f1_result = NaN;
    let f1_callCount = 0;
    const f1_cached = makeCaching(
      (x) => { f1_callCount++; f1_x = x; return f1_result; }
    );

    f1_result = 11;
    assert.equal(11, f1_cached(1));
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);

    f1_result = 22;
    assert.equal(22, f1_cached(2));
    assert.equal(2, f1_x);
    assert.equal(2, f1_callCount);
  });
  
  it("makeCaching(obj.f1) obj.f1_cached(1) obj.f1_cached(2)", function() {
    let f1_x = NaN;
    let f1_result = NaN;
    let f1_callCount = 0;
    let f1_this = undefined;
    
    let obj = {
      f1: function(x) {
        f1_callCount++; f1_x = x; f1_this = this; return f1_result;
      }
    }
    
    obj.f1_cached = makeCaching(obj.f1);

    f1_result = 11;
    assert.equal(11, obj.f1_cached(1));
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
    assert.equal(obj, f1_this);

    f1_result = 22;
    assert.equal(22, obj.f1_cached(2));
    assert.equal(2, f1_x);
    assert.equal(2, f1_callCount);
    assert.equal(obj, f1_this);
  });

  it("makeCaching(f1) f1_cached(1) f1_cached(1)", function() {
    let f1_x = NaN;
    let f1_result = NaN;
    let f1_callCount = 0;
    function f1(x) { f1_callCount++; f1_x = x; return f1_result; }
    const f1_cached = makeCaching(f1);

    f1_result = 11;
    let f1_cached_result = f1_cached(1);
    
    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);

    f1_result = 22;
    f1_cached_result = f1_cached(1);

    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
  });

  it("makeCaching(f1=>) f1_cached(1) f1_cached(1)", function() {
    let f1_x = NaN;
    let f1_result = NaN;
    let f1_callCount = 0;

    const f1_cached = makeCaching(
      (x) => { f1_callCount++; f1_x = x; return f1_result; }
    );

    f1_result = 11;
    let f1_cached_result = f1_cached(1);
    
    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);

    f1_result = 22;
    f1_cached_result = f1_cached(1);

    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
  });

  it("makeCaching(obj.f1) obj.f1_cached(1) obj.f1_cached(1)", function() {
    let f1_x = NaN;
    let f1_result = NaN;
    let f1_callCount = 0;

    let obj = {
      f1: function(x) {
        f1_callCount++; f1_x = x; f1_this = this; return f1_result;
      }
    }
    
    obj.f1_cached = makeCaching(obj.f1);

    f1_result = 11;
    let f1_cached_result = obj.f1_cached(1);
    
    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
    assert.equal(obj, f1_this);

    f1_result = 22;
    f1_cached_result = obj.f1_cached(1);

    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
    assert.equal(obj, f1_this);
  });
  
  it("makeCaching(f1) f1_cached(1) clearCache f1_cached(1)", function() {
    let f1_x = NaN;
    let f1_result = NaN;
    let f1_callCount = 0;
    function f1(x) { f1_callCount++; f1_x = x; return f1_result; }
    const f1_cached = makeCaching(f1);

    f1_result = 11;
    let f1_cached_result = f1_cached(1);
    
    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
    
    makeCaching.clearCache(f1);

    f1_result = 22;
    f1_x = undefined;
    f1_callCount = 0;
    f1_cached_result = f1_cached(1);

    assert.equal(22, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
  });

  it("makeCaching(f1) makeCaching(f2) f1_cached(1) f2_cached(1) f1_cached(1) f2_cached(1)", function() {
    let f1_x = undefined;
    let f1_result = undefined;
    let f1_callCount = 0;
    function f1(x) { f1_callCount++; f1_x = x; return f1_result; }
    const f1_cached = makeCaching(f1);

    let f2_x = undefined;
    let f2_result = undefined;
    let f2_callCount = 0;
    function f2(x) { f2_callCount++; f2_x = x; return f2_result; }
    const f2_cached = makeCaching(f2);

    f1_result = 11;
    f2_result = 2011;
    
    let f1_cached_result = f1_cached(1);
    
    assert.equal(11, f1_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
    assert.equal(undefined, f2_x);
    assert.equal(0, f2_callCount);

    let f2_cached_result = f2_cached(201);

    assert.equal(2011, f2_cached_result);
    assert.equal(1, f1_x);
    assert.equal(1, f1_callCount);
    assert.equal(201, f2_x);
    assert.equal(1, f2_callCount);

    f1_result = 22;
    f2_result = 2022;
    f1_x = undefined;
    f2_x = undefined;
    f1_callCount = 0;
    f2_callCount = 0;

    f1_cached_result = f1_cached(1);
    
    assert.equal(11, f1_cached_result);
    assert.equal(undefined, f1_x);
    assert.equal(0, f1_callCount);
    assert.equal(undefined, f2_x);
    assert.equal(0, f2_callCount);

    f2_cached_result = f2_cached(201);

    assert.equal(2011, f2_cached_result);
    assert.equal(undefined, f1_x);
    assert.equal(0, f1_callCount);
    assert.equal(undefined, f2_x);
    assert.equal(0, f2_callCount);
  });
  
});
