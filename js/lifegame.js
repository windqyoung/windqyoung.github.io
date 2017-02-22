(function() {
    var row_num = 20;
    var col_num = 20;
    var run_rate = 100;
    var render_rate = 100;
    var init_rate = 0.4;

    var flash_id, run_id, live_id;
    var canvas, ctx, rect_w, rect_h;
    var grid = [];
    var initSum = 0;

    function start() {
        $('#start_btn').hide();
        $('#stop_btn').show();

        row_num = +$('#row_num').val();
        col_num = +$('#col_num').val();
        run_rate = +$('#run_rate').val();
        render_rate = +$('#render_rate').val();
        init_rate = +$('#init_rate').val();

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'pink';

        rect_w = canvas.width / col_num;
        rect_h = canvas.height / row_num;

        initGrid();
        run();

        run_id = setInterval(run, run_rate);
        render_id = setInterval(render, render_rate);
        live_id = setInterval(liveRate, render_rate);
    }

    function initGrid()
    {
        initSum = 0;
        grid = new Array((row_num + 2) * (col_num + 2));
        grid.fill(0);
        for (var y = 1; y <= row_num; y ++) {
            for (var x = 1; x <= col_num; x ++) {
                var v = Math.random() < init_rate ? 1 : 0;
                grid[offset(x, y)] = v;
                initSum += v;
            }
        }
    }

    function stop() {
        $('#start_btn').show();
        $('#stop_btn').hide();

        clearInterval(run_id);
        clearInterval(render_id);
        clearInterval(live_id);
    }

    function run() {
        var tempGrid = new Array((row_num + 2) * (col_num + 2));
        tempGrid.fill(0);
        for (var y = 1; y <= row_num; y ++) {
            for (var x = 1; x <= col_num; x ++) {
                var num = grid[offset(x - 1, y - 1)] + grid[offset(x, y - 1)] + grid[offset(x + 1, y - 1)]
                        + grid[offset(x - 1, y    )] +                        + grid[offset(x + 1, y    )]
                        + grid[offset(x - 1, y + 1)] + grid[offset(x, y + 1)] + grid[offset(x + 1, y + 1)];

                var offxy = offset(x, y);
                if (num == 3) {
                    tempGrid[offxy] = 1;
                }
                else if (num == 2) {
                    tempGrid[offxy] = grid[offxy];
                }
                else {
                    tempGrid[offxy] = 0;
                }
            }
        }
        grid = tempGrid;
    }

    function offset(x, y) {
        return y * (col_num + 2) + x;
    }

    function render() {
        for (var y = 1; y <= row_num; y ++) {
            for (var x = 1; x <= col_num; x ++) {
                renderXY(x, y, grid[offset(x, y)]);
            }
        }
    }

    function renderXY(x, y, val) {
        var of_x = (x - 1) * rect_w;
        var of_y = (y - 1) * rect_h;
        if (val) {
            ctx.fillRect(of_x, of_y, rect_w, rect_h);
        }
        else {
            ctx.clearRect(of_x, of_y, rect_w, rect_h);
        }
    }

    var liveMax = 0;
    var liveMin = 99999999;
    function liveRate() {
        var sum = 0;
        for (var i = 0, len = grid.length; i < len; i ++) {
            sum += grid[i];
        }
        liveMax = Math.max(sum, liveMax);
        liveMin = Math.min(sum, liveMin);

        var rc = row_num * col_num;
        var p = sum * 100 / rc;
        var msg = sum + '/' + rc
                + ', ' + p.toFixed(2) + '%'
                + ', min: ' + liveMin + ', max: ' + liveMax
                + ', init: ' + initSum
                ;
        $('#live_rate').text(msg);
    }

    $(document).ready(function() {
        $('#row_num').val(row_num);
        $('#col_num').val(col_num);
        $('#run_rate').val(run_rate);
        $('#render_rate').val(render_rate);
        $('#init_rate').val(init_rate);

        $('#start_btn').on('click', start);
        $('#stop_btn').on('click', stop);
        $('body').on('keydown', function(e) {
            if (e.keyCode == 27) {
                stop();
            }
        });
    });
})();