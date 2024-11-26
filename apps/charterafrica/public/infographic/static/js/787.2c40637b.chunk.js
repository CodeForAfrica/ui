(self.webpackChunkecdpm_charter_project =
  self.webpackChunkecdpm_charter_project || []).push([
  [787],
  {
    787(e, t, n) {
      n.r(t),
        n.d(t, {
          getCLS() {
            return y;
          },
          getFCP() {
            return h;
          },
          getFID() {
            return C;
          },
          getLCP() {
            return P;
          },
          getTTFB() {
            return D;
          },
        });
      let i;
      let r;
      let a;
      let o;
      const u = function (e, t) {
        return {
          name: e,
          value: void 0 === t ? -1 : t,
          delta: 0,
          entries: [],
          id: "v2-"
            .concat(Date.now(), "-")
            .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
        };
      };
      const c = function (e, t) {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(e)) {
            if (e === "first-input" && !("PerformanceEventTiming" in self))
              return;
            const n = new PerformanceObserver(function (e) {
              return e.getEntries().map(t);
            });
            return n.observe({ type: e, buffered: !0 }), n;
          }
        } catch (e) {}
      };
      const f = function (e, t) {
        const n = function n(i) {
          (i.type !== "pagehide" && document.visibilityState !== "hidden") ||
            (e(i),
            t &&
              (removeEventListener("visibilitychange", n, !0),
              removeEventListener("pagehide", n, !0)));
        };
        addEventListener("visibilitychange", n, !0),
          addEventListener("pagehide", n, !0);
      };
      const s = function (e) {
        addEventListener(
          "pageshow",
          function (t) {
            t.persisted && e(t);
          },
          !0,
        );
      };
      const m = function (e, t, n) {
        let i;
        return function (r) {
          t.value >= 0 &&
            (r || n) &&
            ((t.delta = t.value - (i || 0)),
            (t.delta || void 0 === i) && ((i = t.value), e(t)));
        };
      };
      let v = -1;
      const p = function () {
        return document.visibilityState === "hidden" ? 0 : 1 / 0;
      };
      const d = function () {
        f(function (e) {
          const t = e.timeStamp;
          v = t;
        }, !0);
      };
      const l = function () {
        return (
          v < 0 &&
            ((v = p()),
            d(),
            s(function () {
              setTimeout(function () {
                (v = p()), d();
              }, 0);
            })),
          {
            get firstHiddenTime() {
              return v;
            },
          }
        );
      };
      var h = function (e, t) {
        let n;
        const i = l();
        let r = u("FCP");
        const a = function (e) {
          e.name === "first-contentful-paint" &&
            (f && f.disconnect(),
            e.startTime < i.firstHiddenTime &&
              ((r.value = e.startTime), r.entries.push(e), n(!0)));
        };
        const o =
          window.performance &&
          performance.getEntriesByName &&
          performance.getEntriesByName("first-contentful-paint")[0];
        var f = o ? null : c("paint", a);
        (o || f) &&
          ((n = m(e, r, t)),
          o && a(o),
          s(function (i) {
            (r = u("FCP")),
              (n = m(e, r, t)),
              requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                  (r.value = performance.now() - i.timeStamp), n(!0);
                });
              });
          }));
      };
      let g = !1;
      let T = -1;
      var y = function (e, t) {
        g ||
          (h(function (e) {
            T = e.value;
          }),
          (g = !0));
        let n;
        const i = function (t) {
          T > -1 && e(t);
        };
        let r = u("CLS", 0);
        let a = 0;
        let o = [];
        const v = function (e) {
          if (!e.hadRecentInput) {
            const t = o[0];
            const i = o[o.length - 1];
            a &&
            e.startTime - i.startTime < 1e3 &&
            e.startTime - t.startTime < 5e3
              ? ((a += e.value), o.push(e))
              : ((a = e.value), (o = [e])),
              a > r.value && ((r.value = a), (r.entries = o), n());
          }
        };
        const p = c("layout-shift", v);
        p &&
          ((n = m(i, r, t)),
          f(function () {
            p.takeRecords().map(v), n(!0);
          }),
          s(function () {
            (a = 0), (T = -1), (r = u("CLS", 0)), (n = m(i, r, t));
          }));
      };
      const E = { passive: !0, capture: !0 };
      const w = new Date();
      const L = function (e, t) {
        i || ((i = t), (r = e), (a = new Date()), F(removeEventListener), S());
      };
      var S = function () {
        if (r >= 0 && r < a - w) {
          const e = {
            entryType: "first-input",
            name: i.type,
            target: i.target,
            cancelable: i.cancelable,
            startTime: i.timeStamp,
            processingStart: i.timeStamp + r,
          };
          o.forEach(function (t) {
            t(e);
          }),
            (o = []);
        }
      };
      const b = function (e) {
        if (e.cancelable) {
          const t =
            (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
          e.type == "pointerdown"
            ? (function (e, t) {
                const n = function () {
                  L(e, t), r();
                };
                const i = function () {
                  r();
                };
                var r = function () {
                  removeEventListener("pointerup", n, E),
                    removeEventListener("pointercancel", i, E);
                };
                addEventListener("pointerup", n, E),
                  addEventListener("pointercancel", i, E);
              })(t, e)
            : L(t, e);
        }
      };
      var F = function (e) {
        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(
          function (t) {
            return e(t, b, E);
          },
        );
      };
      var C = function (e, t) {
        let n;
        const a = l();
        let v = u("FID");
        const p = function (e) {
          e.startTime < a.firstHiddenTime &&
            ((v.value = e.processingStart - e.startTime),
            v.entries.push(e),
            n(!0));
        };
        const d = c("first-input", p);
        (n = m(e, v, t)),
          d &&
            f(function () {
              d.takeRecords().map(p), d.disconnect();
            }, !0),
          d &&
            s(function () {
              let a;
              (v = u("FID")),
                (n = m(e, v, t)),
                (o = []),
                (r = -1),
                (i = null),
                F(addEventListener),
                (a = p),
                o.push(a),
                S();
            });
      };
      const k = {};
      var P = function (e, t) {
        let n;
        const i = l();
        let r = u("LCP");
        const a = function (e) {
          const t = e.startTime;
          t < i.firstHiddenTime && ((r.value = t), r.entries.push(e), n());
        };
        const o = c("largest-contentful-paint", a);
        if (o) {
          n = m(e, r, t);
          const v = function () {
            k[r.id] ||
              (o.takeRecords().map(a), o.disconnect(), (k[r.id] = !0), n(!0));
          };
          ["keydown", "click"].forEach(function (e) {
            addEventListener(e, v, { once: !0, capture: !0 });
          }),
            f(v, !0),
            s(function (i) {
              (r = u("LCP")),
                (n = m(e, r, t)),
                requestAnimationFrame(function () {
                  requestAnimationFrame(function () {
                    (r.value = performance.now() - i.timeStamp),
                      (k[r.id] = !0),
                      n(!0);
                  });
                });
            });
        }
      };
      var D = function (e) {
        let t;
        const n = u("TTFB");
        (t = function () {
          try {
            const t =
              performance.getEntriesByType("navigation")[0] ||
              (function () {
                const e = performance.timing;
                const t = { entryType: "navigation", startTime: 0 };
                for (const n in e)
                  n !== "navigationStart" &&
                    n !== "toJSON" &&
                    (t[n] = Math.max(e[n] - e.navigationStart, 0));
                return t;
              })();
            if (
              ((n.value = n.delta = t.responseStart),
              n.value < 0 || n.value > performance.now())
            )
              return;
            (n.entries = [t]), e(n);
          } catch (e) {}
        }),
          document.readyState === "complete"
            ? setTimeout(t, 0)
            : addEventListener("load", function () {
                return setTimeout(t, 0);
              });
      };
    },
  },
]);
// # sourceMappingURL=787.2c40637b.chunk.js.map
