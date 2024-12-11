<?php

/** @var \App\Model\Competitor $competitor */
/** @var \App\Service\Router $router */

$title = "Edit Competitor {$competitor->getName()} ({$competitor->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('competitor-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="competitor-edit">
        <input type="hidden" name="id" value="<?= $competitor->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('competitor-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('competitor-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="competitor-delete">
                <input type="hidden" name="id" value="<?= $competitor->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
