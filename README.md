# Tag-trace
A simple tag based logging tracer

To enable traces, toggle tags on or off on the settings object.

NOTE: This tracer overrides (gags) the regular console.log. This is done to prevent badly behaving
third party dependencies from spamming the console with unfiltered output.

## Special settings:

* "disabled" -- gag all console tracing. Good for release builds.
* "matrixMode" -- override all tags to enabled. Good for those times you want to see *everything* that's going on.
* "timestampTraces" -- add timestamp (ms) to every log line.
* "concat" -- attempt to stringify and concatenate all arguments of trace calls. Useful for platforms that don't format JS outputs very well.
* "PROFILE" -- start/end a profiling point. Useful for platforms with no advanced profiling or flame graphs, e.g. mobile/embedded.

For different logging levels, continue using console.warn, console.error as normal.

## Getting Tag-trace to play nice with tests

Sometimes you want to see regular console output, but don't want to pollute your settings or app codebase with test-related stuff.

In this case, simply require from your tests before/beforeEach, and call:

``T.allowConsoleLog(true);``

This will let all normal console.log output through.
