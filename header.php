<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">

  <head>
    <meta
      charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/frontend/dist/assets/index.d4685bcc.css">
    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
